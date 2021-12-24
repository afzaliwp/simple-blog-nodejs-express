const sessionHandler = require('@models/sessionHandler');
const session = require('express-session');
const hashService = require('@services/hashService');
const sessionModel = new sessionHandler;

exports.showLogin = (req, res) => {
    res.render('auth/login', { layout: 'auth' });
}

exports.doLogin = (req, res) => {
    res.send(req.body);
}