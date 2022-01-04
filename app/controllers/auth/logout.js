const session = require('express-session');

exports.logout = async(req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/404')
        }
        return res.redirect('/auth/login');
    });
}