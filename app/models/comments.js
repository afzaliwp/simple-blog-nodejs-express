const db = require('@database/mysql');
const dateService = require('@services/dateService');
const userService = require('@services/userService');
exports.getAllComments = async() => {
    const [result] = await db.query(`
    SELECT c.*, p.title, p.slug
    FROM comments c
    JOIN posts p
    ON c.post_id = p.ID
    `);
    const localizedDate = result.map((comment) => {
        comment.persian_created_at = dateService.toPersianDate(comment.created_at);
        comment.userAvatar = userService.getAvatar(comment.email, { s: 35 });
        return comment;
    });

    return localizedDate;
}