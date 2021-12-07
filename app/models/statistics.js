const db = require('../../database/mysql');
exports.totalData = async(dataTableName) => {
    if (dataTableName === 'visits') {
        const [result] = await db.query(`SELECT SUM(views) as totalData  FROM posts`);
        return result[0].totalData;
    }
    const [result] = await db.query(`SELECT COUNT(ID) as totalData  FROM ${dataTableName}`);
    return result[0].totalData;
}