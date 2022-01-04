const userService = require('@services/userService');
module.exports = app => {
    app.use((req, res, next) => {
        const errors = req.flash('errors');
        const success = req.flash('success');
        res.adminRender = (template, options) => {
            const currentUser = req.session.user;
            if (currentUser) {
                currentUser.avatar = userService.getAvatar(currentUser.email, { s: 90 });
            }

            options = {...options, layout: 'admin', errors, success, currentUser };
            res.render(template, options);
        }

        res.newRender = (template, options) => {
            options = {...options, errors, success };
            res.render(template, options);
        }

        next();
    });
}