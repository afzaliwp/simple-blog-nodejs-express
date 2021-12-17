const commentsModel = require('@models/comments');
exports.index = async(req, res) => {
    const allComments = await commentsModel.getAllComments();
    res.render('admin/comments/index', {
        layout: 'admin',
        allComments,
        helpers: {
            checkStatus: function(status, options) {
                if (status == 0) {
                    return options.fn({ class: 'warning', icon: 'zmdi zmdi-eye', text: 'در انتظار بازبینی' });
                }
                if (status == 1) {
                    return options.fn({ class: 'success', icon: 'zmdi zmdi-check', text: 'تایید' });
                }
                if (status == 2) {
                    return options.fn({ class: 'danger', icon: 'zmdi zmdi-close', text: 'رد شده' });
                }
            }
        }
    });
}