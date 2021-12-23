const settingsModel = require('@models/settings');
const sessionHandler = require('@models/sessionHandler');
const defaults = require('@models/settings/defaultSettings');

const session = require('express-session');
const sessionModel = new sessionHandler;

exports.index = async(req, res) => {
    const allSettings = await settingsModel.getAllSettings();
    const messages = sessionModel.returnSessionAndDelete(req, 'updateSettings');

    res.render('admin/settings/index', {
        layout: 'admin',
        allSettings,
        messages,
        helpers: {
            isChecked: function(value, options) {
                return value == 1 ? options.fn(this) : options.inverse(this)
            }
        }
    });
}

exports.update = async(req, res) => {
    req.body.enable_comments = !req.body.enable_comments ? 0 : 1;
    req.body.enable_register = !req.body.enable_register ? 0 : 1;
    const data = req.body;
    const dataToSave = [];
    defaults.forEach(async(setting) => {
        dataToSave.push({
            name: setting.setting_name,
            value: data[setting.setting_name]
        });
    });

    const results = await settingsModel.updateSettings(dataToSave);

    req.session.updateSettings = {
        success: false,
        message: 'تنظیمات ذخیره نشد!'
    }
    for (result of results) {
        if (result.result.affectedRows > 0) {
            req.session.updateSettings = {
                success: true,
                message: 'تنظیمات ذخیره شد!'
            }
            break;
        }
    }

    sessionModel.saveSessionAndRedirect(req, res, '/admin/settings');
}