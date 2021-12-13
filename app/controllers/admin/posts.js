const postsModel = require('@models/posts');
const usersModel = require('@models/users');
const dateService = require('@services/dateService');
const PostValidator = require('@validators/post');
const sessionHandler = require('@models/sessionHandler');
const session = require('express-session');

exports.index = async(req, res) => {
    let errors = [];
    let success = [];
    const posts = await postsModel.allPosts();
    const sessionModel = new sessionHandler;

    //Remove post messages injected using session
    if (req.session.postRemoveError) {
        const validator = new PostValidator;
        errors = validator.remove(req);
        delete req.session['postRemoveError'];
    }
    if (req.session.postRemoveSuccess) {
        const validator = new PostValidator;
        success = validator.remove(req);
        delete req.session['postRemoveSuccess'];
    }
    console.log(req.session);
    if (req.session.postCreated) {
        const validator = new PostValidator;
        success = validator.create(req.session);
        delete req.session['postCreated'];
    }

    const localizedData = posts.map((post) => {
        post.created_at_persian = dateService.toPersianDate(post.created_at);
        return post;
    });
    res.render('admin/posts/index', {
        layout: 'admin',
        posts: localizedData,
        errors,
        success
    });
}

exports.create = async(req, res) => {
    const sessionModel = new sessionHandler;

    const errors = sessionModel.returnSessionAndDelete(req, 'createPostErrors');
    const hasError = sessionModel.returnSessionAndDelete(req, 'createPostHasError');
    const retrievedData = sessionModel.returnSessionAndDelete(req, 'retrievedData') || null;

    const authors = await usersModel.getAllUsersData(['ID', 'full_name']);

    res.render('admin/posts/create', { layout: 'admin', authors, errors, hasError, retrievedData });
}

exports.store = async(req, res) => {
    const validator = new PostValidator;
    const sessionModel = new sessionHandler;

    const authors = await usersModel.getAllUsersData(['ID', 'full_name']);

    const postData = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        author_id: req.body.author_id,
        status: req.body.status,
    }

    const errors = validator.create(postData);
    if (errors.length > 0) {
        req.session.createPostErrors = errors;
        req.session.createPostHasError = true;
        req.session.retrievedData = postData;

        return sessionModel.saveSessionAndRedirect(req, res, '/admin/posts/create');
    } else {
        const insertId = await postsModel.create(postData);
        if (insertId) {
            req.session.postCreated = true;

            return sessionModel.saveSessionAndRedirect(req, res, '/admin/posts');
        }
    }
}

exports.remove = async(req, res) => {
    const redirect = new Redirect;
    const postID = req.params.postID;
    const success = await postsModel.remove(postID);

    if (success === 'success') {
        req.session.postRemoveSuccess = true;
        req.session.postRemoveError = false;
    }
    if (success === 'failed') {
        req.session.postRemoveSuccess = false;
        req.session.postRemoveError = true;
    }

    return sessionModel.saveSessionAndRedirect(req, res, '/admin/posts');
}