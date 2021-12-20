const db = require('@database/mysql');
exports.getAllUsersData = async(columns = []) => {
    const sqlColumns = columns.length > 0 ? columns.toString(',') : '*';
    const [result] = await db.query(`
    SELECT ${sqlColumns}
    FROM users
    `);
    return result;
}

exports.getUser = async(userID, columns = []) => {
    const sqlColumns = columns.length > 0 ? columns.toString(',') : '*';
    const [result] = await db.query(`
    SELECT ${sqlColumns}
    FROM users
    WHERE ID = ?
    LIMIT 1
    `, [userID]);
    return result;
}

exports.deleteUser = async(userID) => {
    const [result] = await db.query(`DELETE FROM users WHERE ID=? LIMIT 1`, [userID]);
    return result.affectedRows;
}

exports.updateUser = async(userID, userData) => {
    const result = await db.query(`UPDATE users SET ? WHERE ID = ? LIMIT 1`, [userData, userID]);
    return result[0].affectedRows > 0;
}