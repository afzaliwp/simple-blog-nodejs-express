const statistics = require('../../models/statistics');
exports.index = async(req, res) => {
    const data = {
        totalVisits: 1,
        totalComments: 2,
        totalPosts: 3,
        totalUsers: statistics.totalUsers,
    }
    res.render('admin/dashboard/index', { layout: 'admin', ...data });
}