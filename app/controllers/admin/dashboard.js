const statistics = require('@models/statistics');
const dateService = require('@services/dateService');
const commentModel = require('@models/comments');
const postsModel = require('@models/posts');

exports.index = async(req, res) => {
    const latestComments = await commentModel.getLatestComments();
    const presentedComments = latestComments.map((comment) => {
        comment.relativeTime = dateService.toHumanTimeDifference(comment.created_at);
        return comment;
    });
    const data = {
        totalVisits: await statistics.totalData('visits'),
        totalComments: await statistics.totalData('comments'),
        totalPosts: await statistics.totalData('posts'),
        totalUsers: await statistics.totalData('users'),
        latestComments: presentedComments
    }
    res.adminRender('admin/dashboard/index', {...data });
}

exports.createDraftPost = async(req, res) => {
    const postData = {
        title: req.body.title,
        slug: 'change the slug',
        content: req.body.content,
        author_id: req.session.user.ID,
        status: 2,
    }
    const errors = [];
    if (postData.title === '') {
        errors.push('عنوان نمیتواند خالی باشد.');
    }
    if (postData.content === '') {
        errors.push('محتوا نمیتواند خالی باشد.');
    }

    if (errors.length > 0) {
        req.flash('errors', errors);
        return res.redirect('/admin/dashboard#draftForm');
    }

    const newPostID = await postsModel.create(postData);
    if (newPostID > 0) {
        req.flash('success', ['پیش نویس با موفقیت ایجاد شد. آن را از طریق ویرایش مطلب ویرایش کنید یا انتشار دهید.']);
        return res.redirect('/admin/dashboard#draftForm');
    }
}