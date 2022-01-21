const postsModel = require('@models/posts');
const settingsModel = require('@models/settings');
const dateService = require('@services/dateService');

exports.index = async(req, res) => {
    const currentPage = 'page' in req.query ? parseInt(req.query.page) : 1;
    const perPage = await settingsModel.getSetting('post_per_page');
    const posts = await postsModel.allPosts(parseInt(currentPage), parseInt(perPage));
    const totalPosts = await postsModel.countAllPosts();
    const totalPages = Math.ceil(totalPosts / perPage);
    const pagination = {
        currentPage,
        totalPages: Math.ceil(totalPosts / perPage),
        nextPage: currentPage < totalPages ? currentPage + 1 : totalPages,
        prevPage: currentPage > 1 ? currentPage - 1 : 1,
        isNextPageDisabled: currentPage == totalPages ? 'disabled' : '',
        isPrevPageDisabled: currentPage == 1 ? 'disabled' : ''
    }

    const presentedPosts = posts.map((post) => {
        post.excerpt = post.content.substr(0, 100);
        post.persian_date = dateService.toPersianDate(post.created_at);
        return post;
    });
    res.frontRender('front/home', { posts: presentedPosts, pagination });
}

exports.notFound = async(req, res) => {
    res.frontRender('front/404');
}