const sessionHandler = require('@models/sessionHandler');
const session = require('express-session');
const hashService = require('@services/hashService');
const sessionModel = new sessionHandler;

exports.showRegister = (req, res) => {
    res.render('auth/register', { layout: 'auth' });
}

exports.doRegister = (req, res) => {
    res.send(req.body);
}