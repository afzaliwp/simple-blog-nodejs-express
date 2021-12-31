const statistics = require('@models/statistics');
const dateService = require('@services/dateService');
const commentModel = require('@models/comments');
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