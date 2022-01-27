const hashService = require('@services/hashService');
const settingsModel = require('@models/settings');
const usersModel = require('@models/users');

exports.showRegister = async(req, res) => {
    const enableRegister = await settingsModel.getSetting('enable_register');
    if (enableRegister > 0) {
        return res.newRender('auth/register', { layout: 'auth' });
    } else {
        return res.frontRender('front/404', { layout: 'front', websiteTitle: 'صفحه مورد نظر پیدا نشد!' });
    }
}

exports.doRegister = async(req, res) => {
    const newUserData = {
        email: req.body.email,
        password: hashService.hashPassword(req.body.password),
        full_name: req.body.email
    };
    if (req.body.password !== req.body['repeat-password']) {
        req.flash('errors', ['رمز و تکرار رمز یکسان نیست!']);
        return res.redirect('/auth/register');
    }

    const emailExists = await usersModel.findUserByEmail(newUserData.email);
    if (emailExists || !newUserData.email) {
        req.flash('errors', ['این ایمیل قبلا ثبت شده است یا خالی است.']);
        return res.redirect('/auth/register');
    }

    const newUserID = await usersModel.createUser(newUserData);
    if (newUserID) {
        req.flash('success', ['ثبت نام شما با موفقیت انجام شد.']);
        return res.redirect('/auth/login');
    }

    req.flash('errors', ['مشکلی پیش آمده است. ثبت نام شما انجام نشد.']);
    return res.redirect('/auth/register');
}