const postsModel = require('@models/posts');
const dateService = require('@services/dateService');

exports.showPost = async(req, res) => {
    const postSlug = req.params.postSlug;
    const post = await postsModel.getPostBySlug(postSlug);
    if (post) {
        const localizedData = {
            ...post,
            persian_created_at: dateService.toPersianDate(post.created_at)
        }
        const isUserLoggedIn = 'user' in req.session ? req.session.user : false;
        return res.frontRender('front/post', { post: localizedData, bodyClass: 'single-post bg-gray', user: isUserLoggedIn });
    } else {
        return res.redirect('/404');
    }
}