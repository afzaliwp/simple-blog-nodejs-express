const usersModel = require('@models/users');
const userRoles = require('@models/users/userRoles');
const userValidator = require('@validators/user');
const dateService = require('@services/dateService');
const session = require('express-session');
const hashService = require('@services/hashService');

exports.index = async(req, res) => {
    let updateSuccess;
    let createUserSuccess;
    const allUsers = await usersModel.getAllUsersData();
    const presentedUsersData = allUsers.map((user) => {
        user.persian_created_at = dateService.toPersianDate(user.created_at);
        return user;
    });

    res.adminRender('admin/users/index', {
        allUsers: presentedUsersData,
        helpers: {
            persianRole: (role, options) => {
                if (role == userRoles.ADMIN) {
                    return options.fn({ persian: 'مدیر سایت' });
                }
                if (role == userRoles.AUTHOR) {
                    return options.fn({ persian: 'نویسنده' });
                }
                if (role == userRoles.SUBSCRIBER) {
                    return options.fn({ persian: 'کاربر' });
                }
                return options.inverse({ persian: 'نقش نامعتبر' });
            }
        }
    });
}

exports.remove = async(req, res) => {
    const userID = req.params.userID;
    const deleteResult = await usersModel.deleteUser(userID);

    if (deleteResult) {
        req.flash('success', [`کاربر ${userID} با موفقیت حذف شد`]);
    } else {
        req.flash('errors', ['خطایی رخ داده است.کاربر حذف نشد!']);
    }
    return res.redirect('/admin/users');
}

exports.edit = async(req, res) => {
    const userID = req.params.userID;
    const userData = await usersModel.getUser(userID);

    res.adminRender('admin/users/edit', {
        layout: 'admin',
        userData: userData[0],
        helpers: {
            userHasRole: function(current, options) {
                return current == userData[0].role ? options.fn(this) : options.inverse(this);
            }
        }
    });
}

exports.update = (req, res) => {
    const validator = new userValidator;
    const userID = req.params.userID;
    const userData = {
        role: req.body.role,
        full_name: req.body.full_name,
        email: req.body.email
    };

    if (req.body.password !== '') {
        userData.password = hashService.hashPassword(req.body.password);
    }

    const errors = validator.create(userData);

    if (errors.length > 0) {
        req.flash('errors', errors);
        return res.redirect(`/admin/users/edit/${userID}`);
    }

    const updateResult = usersModel.updateUser(userID, userData);
    if (!updateResult) {
        req.flash('errors', ['خطایی رخ داده است. اطلاعات کاربر ویرایش نشد.']);
        return res.redirect(`/admin/users/edit/${userID}`);
    }

    req.flash('success', ['اطلاعات کاربر با موفقیت ویرایش شد.']);
    res.redirect('/admin/users');
    return true;

}

exports.create = async(req, res) => {
    res.adminRender('admin/users/create', {
        retrievedData: req.session.retrievedData,
        helpers: {
            roleHasSet: function(data, options) {
                if (retrievedData) {
                    return data == retrievedData.role ? options.fn(this) : options.inverse(this);
                }
            }

        }
    });
}

exports.store = async(req, res) => {
    const postData = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: hashService.hashPassword(req.body.password),
        role: req.body.role,
    };

    const validationResult = await userValidator.create(req.body);

    if (validationResult.errors) {
        req.flash('errors', validationResult.errors);
        req.session.retrievedData = req.body;
        return res.redirect('/admin/users/create');
    }

    const insertId = await usersModel.createUser(postData);
    if (insertId > 0) {
        req.flash('success', validationResult.success);
        return res.redirect('/admin/users');
    } else {
        req.flash('errors', userValidator.dbError());
        req.session.retrievedData = req.body;
        return res.redirect('/admin/users/create');
    }
}