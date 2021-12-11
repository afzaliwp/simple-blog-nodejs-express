const postsModel = require('@models/posts');
const usersModel = require('@models/users');
const dateService = require('@services/dateService');
const PostValidator = require('@validators/post');
const { resolve } = require('path/posix');
exports.index = async(req, res) => {
    const posts = await postsModel.allPosts();
    const localizedData = posts.map((post) => {
        post.created_at_persian = dateService.toPersianDate(post.created_at);
        return post;
    });
    res.render('admin/posts/index', { layout: 'admin', posts: localizedData });
}
exports.create = async(req, res) => {
    const errors = req.session.createPostErrors;
    const hasError = req.session.createPostHasError;
    const authors = await usersModel.getAllUsersData(['ID', 'full_name']);

    res.render('admin/posts/create', { layout: 'admin', authors, errors, hasError });
}

exports.store = async(req, res) => {
    let hasError = false;
    const authors = await usersModel.getAllUsersData(['ID', 'full_name']);
    const postData = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        author_id: req.body.author_id,
        status: req.body.status,
    }
    const validator = new PostValidator;
    const errors = validator.create(postData);
    console.log(errors);
    if (errors.length > 0) {
        hasError = true;
        req.session.createPostErrors = errors;
        req.session.createPostHasError = hasError;
        return new Promise((resolve, reject) => {
            req.session.save((err) => {
                if (err) {
                    reject(err);
                }
                resolve(res.redirect('/admin/posts/create'));
            })
        });
    } else {
        const result = await postsModel.create(postData);
        res.render('admin/posts/create', { layout: 'admin', authors, postData });
    }

}