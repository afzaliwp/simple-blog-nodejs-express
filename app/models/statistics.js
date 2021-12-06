const db = require('../../database/mysql');
exports.totalUsers = async() => {
    const [result] = await db.query('SELECT COUNT(ID) as totalUsers FROM users');
    return result[0].totalUsers;
}