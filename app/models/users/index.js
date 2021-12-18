const db = require('@database/mysql');
exports.getAllUsersData = async(columns = []) => {
    const sqlColumns = columns.length > 0 ? columns.toString(',') : '*';
    const [result] = await db.query(`
    SELECT ${sqlColumns}
    FROM users
    `);
    return result;
}

exports.deleteUser = async(userID) => {
    const [result] = await db.query(`DELETE FROM users WHERE ID=? LIMIT 1`, [userID]);
    return result.affectedRows;
}