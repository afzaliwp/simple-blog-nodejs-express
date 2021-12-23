const db = require('@database/mysql');
const defaults = require('@models/settings/defaultSettings');
exports.getAllSettings = async() => {
    const results = {};
    let data;
    for (setting of defaults) {
        data = await this.getSetting(setting.setting_name);
        results[data.name] = data.value;
    }

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
    return result[0];
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
    data.forEach(async(item) => {
        result = await this.updateSetting(item);
        allResults.push(result);
    });

    return allResults;
}