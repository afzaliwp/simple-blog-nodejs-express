const authService = require('@services/authService');
const session = require('express-session');
const hashService = require('@services/hashService');
const userRoles = require('@models/users/userRoles');

exports.showLogin = (req, res) => {
    res.newRender('auth/login', { layout: 'auth' });
}

exports.doLogin = async(req, res) => {
    const isValidUser = await authService.login(req.body.email, req.body.password);
    if (!isValidUser) {
        req.flash('errors', ['نام کاربری یا رمز عبور اشتباه است.']);
        return res.redirect('/auth/login');
    }

    req.session.user = isValidUser;
    if (isValidUser.role == userRoles.ADMIN || isValidUser.role == userRoles.AUTHOR) {
        return res.redirect('/admin/dashboard');
    }
    if (isValidUser.role == userRoles.SUBSCRIBER) {
        return res.redirect('/');
    }
}