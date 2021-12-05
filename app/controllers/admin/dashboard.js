exports.index = (req, res) => {
    const data = {
        totalVisits: 1,
        totalComments: 2,
        totalPosts: 3,
        totalUsers: 4,
    }
    res.render('admin/dashboard/index', { layout: 'admin', ...data });
}