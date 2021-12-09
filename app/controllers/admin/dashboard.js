const statistics = require('@models/statistics');
exports.index = async(req, res) => {
    const data = {
        totalVisits: await statistics.totalData('visits'),
        totalComments: await statistics.totalData('comments'),
        totalPosts: await statistics.totalData('posts'),
        totalUsers: await statistics.totalData('users'),
    }
    res.render('admin/dashboard/index', { layout: 'admin', ...data });
}