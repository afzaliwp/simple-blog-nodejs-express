const usersModel = require('@models/users');
const userRoles = require('@models/users/userRoles');
const dateService = require('@services/dateService');
const sessionHandler = require('@models/sessionHandler');
const session = require('express-session');
const sessionModel = new sessionHandler;

exports.index = async(req, res) => {
    let updateSuccess;
    const allUsers = await usersModel.getAllUsersData();
    const presentedUsersData = allUsers.map((user) => {
        user.persian_created_at = dateService.toPersianDate(user.created_at);
        user.readableRole = userRoles[user.role].persianRoleName;
        return user;
    });

    let deleteUserResult;
    if (req.session.deleteUser) {
        deleteUserResult = sessionModel.returnSessionAndDelete(req, 'deleteUser');
    }
    if (req.session.userUpdateSuccess) {
        updateSuccess = sessionModel.returnSessionAndDelete(req, 'userUpdateSuccess');
    }
    res.render('admin/users/index', { layout: 'admin', allUsers: presentedUsersData, deleteUserResult, updateSuccess });
}

exports.remove = async(req, res) => {
    const userID = req.params.userID;
    const deleteResult = await usersModel.deleteUser(userID);

    req.session.deleteUser = {
        message: `خطایی رخ داده است. کاربر حذف نشد!`,
        success: 'danger'
    }
    if (deleteResult) {
        req.session.deleteUser = {
            message: `کاربر ${userID} با موفقیت حذف شد`,
            success: 'success'
        }
    }
    return sessionModel.saveSessionAndRedirect(req, res, '/admin/users');
}

exports.edit = async(req, res) => {
    let errors;
    const userID = req.params.userID;
    const userData = await usersModel.getUser(userID);

    if (req.session.userUpdateErrors) {
        errors = sessionModel.returnSessionAndDelete(req, 'userUpdateErrors');
    }

    res.render('admin/users/edit', {
        layout: 'admin',
        userData: userData[0],
        errors,
        helpers: {
            userHasRole: function(current, options) {
                return current == userData[0].role ? options.fn(this) : options.inverse(this);
            }
        }
    });
}

exports.update = (req, res) => {
    const userID = req.params.userID;
    let errors = [];
    const userData = {
        role: req.body.role,
        full_name: req.body.full_name,
        email: req.body.email
    };

    if (userData.full_name === '') {
        errors.push('نام کاربر نمی تواند خالی باشد.');
    }
    if (userData.email === '') {
        errors.push('ایمیل کاربر نمی تواند خالی باشد.');
    }

    if (errors.length > 0) {
        req.session.userUpdateErrors = errors;
        sessionModel.saveSessionAndRedirect(req, res, `/admin/users/edit/${userID}`);
        return false;
    }

    const updateResult = usersModel.updateUser(userID, userData);
    if (!updateResult) {
        errors.push('خطایی رخ داده است. اطلاعات کاربر ویرایش نشد.');
        sessionModel.saveSessionAndRedirect(req, res, `/admin/users/edit/${userID}`);
        return false;
    }

    req.session.userUpdateSuccess = `اطلاعات کاربر با موفقیت ویرایش شد.`;
    sessionModel.saveSessionAndRedirect(req, res, `/admin/users`);
    return true;

}