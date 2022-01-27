const session = require('express-session');
const hashService = require('@services/hashService');
const settingsModel = require('@models/settings');

exports.showRegister = async(req, res) => {
    const enableRegister = await settingsModel.getSetting('enable_register');
    if (enableRegister > 0) {
        return res.newRender('auth/register', { layout: 'auth' });
    } else {
        return res.frontRender('front/404', { layout: 'front', websiteTitle: 'صفحه مورد نظر پیدا نشد!' });
    }
}

exports.doRegister = (req, res) => {
    res.send(req.body);
}