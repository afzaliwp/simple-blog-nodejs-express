const userService = require('@services/userService');
const settingsModel = require('@models/settings');

module.exports = app => {
    app.use(async(req, res, next) => {
        const errors = req.flash('errors');
        const success = req.flash('success');

        const websiteTitle = await settingsModel.getSetting('website_title');
        const websiteDescription = await settingsModel.getSetting('website_description');

        res.frontRender = (template, options) => {
            options = {
                layout: 'front',
                bodyClass: 'bg-gray',
                websiteTitle,
                websiteDescription,
                errors,
                success,
                ...options
            };
            res.render(template, options);
        }

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