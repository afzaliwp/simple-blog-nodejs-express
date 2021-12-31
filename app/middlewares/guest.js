const userRoles = require('@models/users/userRoles');
module.exports = (req, res, next) => {
    const userIsLoggedIn = req.session.hasOwnProperty('user');

    if (userIsLoggedIn) {
        const role = req.session.user.role;
        if (role === userRoles.AUTHOR || role === userRoles.ADMIN) {
            res.redirect('/admin/dashboard');
        }

        if (role === userRoles.SUBSCRIBER) {
            res.redirect('/');
        }

    }

    next();
};