const db = require('../../database/mysql');
exports.allPosts = async() => {
    const [result] = await db.query(`SELECT * FROM posts ORDER BY ID DESC`);
    return result;
}