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
    return result[0].insertId;
}

exports.remove = async(postID) => {
    const result = await db.query(`DELETE FROM posts WHERE ID = ?`, [postID]);
    console.log(result);
    if (result[0].affectedRows > 0) {
        return 'success';
    }
    return 'failed';
}