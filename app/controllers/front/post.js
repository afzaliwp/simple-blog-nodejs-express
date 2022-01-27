const postsModel = require('@models/posts');
const commentsModel = require('@models/comments');
const userService = require('@services/userService');
const dateService = require('@services/dateService');
const settingsModel = require('@models/settings');
const _ = require('lodash');

exports.showPost = async(req, res) => {
    const postSlug = req.params.postSlug;
    const post = await postsModel.getPostBySlug(postSlug);
    if (post) {
        const localizedData = {
            ...post,
            persian_created_at: dateService.toPersianDate(post.created_at)
        }
        const comments = await commentsModel.getPostComments(post.ID);
        const presentedComments = comments.map((comment) => {
            comment.persian_created_at = dateService.toPersianDate(comment.created_at);
            comment.avatar = userService.getAvatar(comment.email);
            return comment;
        });
        const groupedComments = _.groupBy(presentedComments, 'parent');
        const isUserLoggedIn = 'user' in req.session ? req.session.user : false;

        const websiteTitle = await settingsModel.getSetting('website_title');
        const enableComments = await settingsModel.getSetting('enable_comments');

        return res.frontRender('front/post', {
            websiteTitle: `${websiteTitle} -- ${post.title}`,
            post: localizedData,
            enabledComments: enableComments > 0,
            comments: groupedComments[0],
            bodyClass: 'single-post bg-gray',
            user: isUserLoggedIn,
            helpers: {
                commentHasChildren: function(commentID, options) {
                    return commentID in groupedComments;
                },
                getCommentChildren: function(commentID, options) {
                    return groupedComments[commentID];
                }
            }
        });
    } else {
        return res.redirect('/404');
    }
}