const session = require('express-session');
const hashService = require('@services/hashService');

exports.showRegister = (req, res) => {
    res.newRender('auth/register', { layout: 'auth' });
}

exports.doRegister = (req, res) => {
    res.send(req.body);
}