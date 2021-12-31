const postsModel = require('@models/posts');
const usersModel = require('@models/users');
const dateService = require('@services/dateService');
const PostValidator = require('@validators/post');
const session = require('express-session');

exports.index = async(req, res) => {
    const posts = await postsModel.allPosts();

    const localizedData = posts.map((post) => {
        post.created_at_persian = dateService.toPersianDate(post.created_at);
        return post;
    });
    res.adminRender('admin/posts/index', {
        layout: 'admin',
        posts: localizedData,
    });
}

exports.create = async(req, res) => {
    const authors = await usersModel.getAllAuthors(['ID', 'full_name']);
    res.adminRender('admin/posts/create', { authors, retrievedData: req.session.retrievedData });
}

exports.store = async(req, res) => {
    const validator = new PostValidator;

    const postData = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        author_id: req.body.author_id,
        status: req.body.status,
    }

    const errors = await validator.create(postData);

    if (errors.length > 0) {
        req.flash('errors', errors);
        req.session.retrievedData = postData;

        res.redirect('/admin/posts/create');
    } else {
        const insertId = await postsModel.create(postData);
        if (insertId) {
            req.flash('success', ['مطلب جدید با موفقیت ایجاد شد.']);

            res.redirect('/admin/posts');
        }
    }
}

exports.remove = async(req, res) => {
    const postID = req.params.postID;
    const success = await postsModel.remove(postID);

    if (success) {
        req.flash('success', [`مطلب شماره ${postID} با موفقیت حذف شد`]);
    } else {
        req.flash('errors', ['مشکلی پیش آمده است. مطلب مورد نظر حذف نشد.']);
    }

    res.redirect('/admin/posts');
}

exports.edit = async(req, res) => {
    const postID = req.params.postID;
    const postData = await postsModel.getPost(postID);
    const authors = await usersModel.getAllAuthors(['ID', 'full_name']);

    res.adminRender('admin/posts/edit', {
        authors,
        postData,
        helpers: {
            isPostAuthor: function(current, options) {
                return current === postData.author_id ? options.fn(this) : options.inverse(this);
            },
            checkPostStatus: function(current, options) {
                return current === postData.status ? options.fn(this) : options.inverse(this);
            }
        }
    });
}
exports.update = async(req, res) => {
    const validator = new PostValidator;
    const postID = req.params.postID;
    const postData = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        author_id: req.body.author_id,
        status: req.body.status,
    }

    const errors = await validator.create(postData);

    if (errors.length > 0) {
        req.flash('errors', errors);
        return res.redirect(`/admin/posts/edit/${postID}`);
    }

    const updateResult = postsModel.update(postID, postData);
    if (updateResult) {
        req.flash('success', ['مطلب با موفقیت ویرایش شد']);
    } else {
        req.flash('errors', ['مشکلی پیش آمده است. مطلب شما ویرایش نشد.']);
    }

    res.redirect('/admin/posts');
}