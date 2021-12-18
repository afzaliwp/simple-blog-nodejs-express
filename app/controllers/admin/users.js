const usersModel = require('@models/users');
const userRoles = require('@models/users/userRoles');
const dateService = require('@services/dateService');
const sessionHandler = require('@models/sessionHandler');
const session = require('express-session');
const sessionModel = new sessionHandler;

exports.index = async(req, res) => {
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

    res.render('admin/users/index', { layout: 'admin', allUsers: presentedUsersData, deleteUserResult });
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