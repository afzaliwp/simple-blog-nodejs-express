const commentsModel = require('@models/comments');
exports.index = async(req, res) => {

    const allComments = await commentsModel.getAllComments();
    console.log(allComments);
    res.render('admin/comments/index', { layout: 'admin', allComments });
}