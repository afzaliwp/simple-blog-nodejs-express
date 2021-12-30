const authService = require('@services/authService');
const sessionHandler = require('@models/sessionHandler');
const session = require('express-session');
const hashService = require('@services/hashService');
const userRoles = require('@models/users/userRoles');
const sessionModel = new sessionHandler;

exports.showLogin = (req, res) => {
    const errors = sessionModel.returnSessionAndDelete(req, 'errors');
    res.render('auth/login', { layout: 'auth', errors });
}

exports.doLogin = async(req, res) => {
    const isValidUser = await authService.login(req.body.email, req.body.password);
    if (!isValidUser) {
        req.session.errors = ['نام کاربری یا رمز عبور اشتباه است.'];
        return sessionModel.saveSessionAndRedirect(req, res, '/auth/login');
    }

    req.session.user = isValidUser;
    if (isValidUser.role == userRoles.ADMIN || isValidUser.role == userRoles.AUTHOR) {
        return res.redirect('/admin/dashboard');
    }
    if (isValidUser.role == userRoles.SUBSCRIBER) {
        return res.redirect('/');
    }
}