const db = require('@database/mysql');
const dateService = require('@services/dateService');
const userService = require('@services/userService');
const commentStatus = require('@models/comments/commentStatus');

exports.getAllComments = async() => {
    const [result] = await db.query(`
    SELECT c.*, p.title, p.slug
    FROM comments c
    JOIN posts p
    ON c.post_id = p.ID
    ORDER BY created_at DESC
    `);
    const localizedDate = result.map((comment) => {
        comment.persian_created_at = dateService.toPersianDate(comment.created_at);
        comment.userAvatar = userService.getAvatar(comment.email, { s: 35 });
        return comment;
    });

    return localizedDate;
}

exports.createComment = async(commentData) => {
    const [result] = await db.query(`INSERT INTO comments SET ?`, [commentData]);
    return result;
}

exports.getLatestComments = async(numberComments = 3) => {
    const [result] = await db.query(`
    SELECT c.*, p.title, p.slug
    FROM comments c
    JOIN posts p
    ON c.post_id = p.ID
    ORDER BY created_at DESC
    LIMIT ${numberComments}
    `);

    return result;
}

exports.changeCommentStatus = async(commentID, status) => {
    [result] = await db.query(`UPDATE comments set status=? WHERE ID=? LIMIT 1`, [commentStatus[status], commentID]);
    return result.affectedRows > 0;
}

exports.deleteComment = async(commentID) => {
    [result] = await db.query(`DELETE FROM comments WHERE ID=?`, commentID);
    return result.affectedRows > 0;
}