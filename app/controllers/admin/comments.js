const commentsModel = require('@models/comments');
const sessionHandler = require('@models/sessionHandler');
const sessionModel = new sessionHandler;
exports.index = async(req, res) => {
    const allComments = await commentsModel.getAllComments();
    const changeCommentStatus = sessionModel.returnSessionAndDelete(req, 'changeCommentStatus');
    let commentStatusMessage;
    let commentStatusSuccess;
    if (changeCommentStatus) {
        commentStatusMessage = changeCommentStatus.message;
        commentStatusSuccess = changeCommentStatus.success ? 'success' : 'danger';
    }

    console.log(commentStatusMessage, commentStatusSuccess);

    res.render('admin/comments/index', {
        layout: 'admin',
        allComments,
        commentStatusMessage,
        commentStatusSuccess,
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
        req.session.changeCommentStatus = {
            success: true,
            message: 'دیدگاه با موفقیت تایید شد.'
        }
    } else {
        req.session.changeCommentStatus = {
            success: false,
            message: 'خطایی پیش آمده است. دیدگاه تایید نشد.'
        }
    }
    return sessionModel.saveSessionAndRedirect(req, res, '/admin/comments');
}

exports.rejectComment = async(req, res) => {
    const commentID = req.params.commentID;
    result = await commentsModel.changeCommentStatus(commentID, 'REJECTED');

    if (result) {
        req.session.changeCommentStatus = {
            success: true,
            message: 'وضعیت دیدگاه به رد شده تغییر کرد.'
        }
    } else {
        req.session.changeCommentStatus = {
            success: false,
            message: 'خطایی پیش آمده است. دیدگاه رد نشد.'
        }
    }
    return sessionModel.saveSessionAndRedirect(req, res, '/admin/comments');
}

exports.deleteComment = async(req, res) => {
    const commentID = req.params.commentID;
    result = await commentsModel.deleteComment(commentID);

    if (result) {
        req.session.changeCommentStatus = {
            success: true,
            message: 'دیدگاه با موفقیت حذف شد.'
        }
    } else {
        req.session.changeCommentStatus = {
            success: false,
            message: 'خطایی پیش آمده است. دیدگاه حذف نشد.'
        }
    }
    return sessionModel.saveSessionAndRedirect(req, res, '/admin/comments');
}