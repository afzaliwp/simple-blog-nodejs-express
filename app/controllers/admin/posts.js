const postsModel = require('@models/posts');
const usersModel = require('@models/users');
const dateService = require('@services/dateService');
exports.index = async(req, res) => {
    const posts = await postsModel.allPosts();
    const localizedData = posts.map((post) => {
        post.created_at_persian = dateService.toPersianDate(post.created_at);
        return post;
    });
    res.render('admin/posts/index', { layout: 'admin', posts: localizedData });
}
exports.create = async(req, res) => {
    const authors = await usersModel.getAllUsersData(['ID', 'full_name']);
    res.render('admin/posts/create', { layout: 'admin', authors });
}

exports.store = async(req, res) => {
    const postData = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        author_id: req.body.author_id,
        status: req.body.status,
    }
    const result = await postsModel.create(postData);
    res.send(req.body);
}