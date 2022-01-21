const commentsModel = require('@models/comments');
const postsModel = require('@models/posts');

exports.store = async(req, res) => {
    const postSlug = req.params.postSlug;
    const post = await postsModel.getPostBySlug(postSlug);

    if (!post) {
        return res.redirect('/404');
    }
    const formData = req.body;
    const commentData = { post_id: post.ID };
    if ('user' in req.session) {
        const user = req.session.user;
        commentData.author_id = user.ID;
        commentData.name = user.full_name;
        commentData.email = user.email;
        commentData.url = null;
    } else {
        commentData.name = formData.name;
        commentData.email = formData.email;
        commentData.url = formData.url;
    }
    commentData.content = formData.content;

    const result = await commentsModel.createComment(commentData);
    console.log(result);
    if (result) {
        req.flash('success', 'دیدگاه شما با موفقیت برای تایید مدیر ارسال شد.');
        return res.redirect(`/p/${postSlug}`);
    }
    return res.redirect('/404');
}