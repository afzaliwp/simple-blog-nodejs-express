const db = require('@database/mysql');
const defaults = require('@models/settings/defaultSettings');
exports.getAllSettings = async() => {
    const results = {};
    let data;
    for (setting of defaults) {
        data = await this.getSetting(setting.setting_name);
        console.log(data);
        if (!data) {
            results[setting.setting_name] = setting.setting_value
        } else {
            results[setting.setting_name] = data;
        }
    }
    console.log(results);
    return results;
}

exports.getSetting = async(settingName) => {
    const [result] = await db.query(`
    SELECT setting_value as value,
           setting_name as name
    FROM settings
    WHERE setting_name = '${settingName}'
    LIMIT 1
    `);
    return result[0].value;
}

exports.updateSetting = async(data) => {
    [result] = await db.query(`
    UPDATE settings 
    SET setting_value=?
    WHERE setting_name=?
    `, [data.value, data.name]);

    return result;
}

exports.updateSettings = async(data) => {
    const allResults = [];
    let result;

    for (item of data) {
        result = await this.updateSetting(item);
        allResults.push({ result });
    }

    return allResults;
}