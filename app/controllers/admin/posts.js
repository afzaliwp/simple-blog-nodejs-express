const postsModel = require('@models/posts');
exports.index = async(req, res) => {
    const data = {
        allPosts: await postsModel.allPosts(),
    }
    res.render('admin/posts/index', { layout: 'admin', ...data });
}