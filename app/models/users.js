const db = require('@database/mysql');
exports.getAllUsersData = async(columns = []) => {
    const sqlColumns = columns.length > 0 ? columns.toString(',') : '*';
    const [result] = await db.query(`
    SELECT ${sqlColumns}
    FROM users
    `);
    console.log(sqlColumns);
    return result;
}