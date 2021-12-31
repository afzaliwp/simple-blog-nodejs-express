const commentsModel = require('@models/comments');
exports.index = async(req, res) => {
    const allComments = await commentsModel.getAllComments();

    res.adminRender('admin/comments/index', {
        allComments,
        helpers: {
            checkStatus: function(status, options) {
                if (status == 0) {
                    return options.fn({ class: 'info', icon: 'zmdi zmdi-eye', text: 'در انتظار بازبینی' });
                }
                if (status == 1) {
                    return options.fn({ class: 'success', icon: 'zmdi zmdi-check', text: 'تایید شده' });
                }
                if (status == 2) {
                    return options.fn({ class: 'warning', icon: 'zmdi zmdi-close', text: 'رد شده' });
                }
            }
        }
    });
}

exports.approveComment = async(req, res) => {
    const commentID = req.params.commentID;
    result = await commentsModel.changeCommentStatus(commentID, 'APPROVED');

    if (result) {
        req.flash('success', ['دیدگاه با موفقیت تایید شد.']);
    } else {
        req.flash('errors', ['خطایی پیش آمده است. دیدگاه تایید نشد.']);
    }
    return res.redirect('/admin/comments');
}

exports.rejectComment = async(req, res) => {
    const commentID = req.params.commentID;
    result = await commentsModel.changeCommentStatus(commentID, 'REJECTED');

    if (result) {
        req.flash('success', ['وضعیت دیدگاه به رد شده تغییر کرد.']);
    } else {
        req.flash('errors', ['خطایی پیش آمده است. دیدگاه رد نشد.']);
    }

    res.redirect('/admin/comments');
}

exports.deleteComment = async(req, res) => {
    const commentID = req.params.commentID;
    result = await commentsModel.deleteComment(commentID);

    if (result) {
        req.flash('success', ['دیدگاه با موفقیت حذف شد.']);
    } else {
        req.flash('errors', ['خطایی پیش آمده است. دیدگاه حذف نشد.']);
    }

    res.redirect('/admin/comments');
}