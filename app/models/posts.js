const db = require('@database/mysql');
exports.allPosts = async() => {
    const [result] = await db.query(`
    SELECT p.*, u.full_name 
    FROM posts p
    JOIN users u ON p.author_id = u.ID
    ORDER BY ID DESC
    `);
    return result;
}

exports.create = async(postData) => {
    const result = await db.query(`INSERT INTO posts SET ?`, [postData]);
    console.log(result);
    return result
}