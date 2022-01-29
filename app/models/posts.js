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
exports.getPostBySlug = async(postSlug) => {
    const [result] = await db.query(`
    SELECT p.*, u.full_name 
    FROM posts p
    JOIN users u ON p.author_id = u.ID
    WHERE p.slug=?
    LIMIT 1
    `, [postSlug]);
    return result[0];
}
exports.allPosts = async(page = 1, perPage = 1) => {
    const offset = (page - 1) * perPage;
    const [result] = await db.query(`
    SELECT p.*, u.full_name 
    FROM posts p
    JOIN users u ON p.author_id = u.ID
    ORDER BY ID DESC
    LIMIT ${offset}, ${perPage}
    `);
    return result;
}

exports.getAllPosts = async() => {
    const [result] = await db.query(`
    SELECT p.*, u.full_name 
    FROM posts p
    JOIN users u ON p.author_id = u.ID
    ORDER BY ID DESC
    `);
    return result;
}

exports.getAllPostsByKeyword = async(keyword) => {
    const [result] = await db.query(`
    SELECT p.*, u.full_name 
    FROM posts p
    JOIN users u ON p.author_id = u.ID
    WHERE title LIKE ?
    ORDER BY ID DESC
    `, ['%' + keyword + '%']);
    return result;
}

exports.countAllPosts = async() => {
    const [result] = await db.query(`SELECT COUNT(ID) as postsCount FROM posts`);

    return result[0].postsCount;
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
    return result[0].affectedRows > 0;
}