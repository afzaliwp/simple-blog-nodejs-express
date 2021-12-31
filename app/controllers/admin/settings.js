const settingsModel = require('@models/settings');
const defaults = require('@models/settings/defaultSettings');
const session = require('express-session');

exports.index = async(req1, res) => {
    const allSettings = await settingsModel.getAllSettings();

    res.adminRender('admin/settings/index', {
        allSettings,
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

    for (result of results) {
        if (result.result.affectedRows > 0) {
            req.flash('success', ['تنظیمات ذخیره شد!']);
            break;
        } else {
            req.flash('errors', ['تنظیمات ذخیره نشد!']);
        }
    }

    return res.redirect('/admin/settings');
}