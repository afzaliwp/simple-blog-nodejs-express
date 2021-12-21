const userRoles = require('@models/users/userRoles');
const db = require('@database/mysql');
const res = require('express/lib/response');
class User {
    async create(data) {
        const success = 'کاربر با موفقیت ایجاد شد.';
        const errors = [];
        if (data.full_name === '') {
            errors.push('نام کاربر نمیتواند خالی باشد');
        }
        if (data.email === '') {
            errors.push('ایمیل کاربر نمیتواند خالی باشد')
        }
        const emailExists = await this.emailExists(data.email);
        if (emailExists) {
            errors.push('ایمیل نمیتواند تکراری باشد');
        }

        if (data.password === '') {
            errors.push('رمز کاربر نمیتواند خالی باشد');
        }
        if (data.role === '') {
            errors.push('نقش کاربر نمیتواند خالی باشد');
        } else if (!userRoles[data.role]) {
            errors.push('نقش نامعتبر');
        }

        if (errors.length > 0) {
            return { errors: errors };
        }

        return { success: success };

    }

    dbError() {
        return ['خطایی رخ داده است. کاربر ایجاد نشد.'];
    }

    async emailExists(email) {
        const [result] = await db.query(`
        SELECT ID
        FROM users
        WHERE email = ?
        LIMIT 1
        `, [email]);

        if (result[0]) {
            return result[0].ID;
        }
        return false;
    };
}

module.exports = new User;