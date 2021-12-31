const db = require('@database/mysql');
exports.getPost = async(postID) => {
    const [result] = await db.query(`
    SELECT p.*, u.full_name 
    FROM posts p
    JOIN users u ON p.author_id = u.ID
    WHERE p.ID = ?
    LIMIT 1
    `, [postID]);
    return result[0];
}

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
    return result[0].affectedRows > 0;
}
exports.update = async(postID, postData) => {
    const result = await db.query(`UPDATE posts SET ? WHERE ID=?`, [postData, postID]);
    return result;
    if (result[0].affectedRows > 0) {
        return 'success';
    }
    return 'failed';
}