module.exports = app => {
    app.use((req, res, next) => {
        const errors = req.flash('errors');
        const success = req.flash('success');

        res.adminRender = (template, options) => {
            options = {...options, layout: 'admin', errors, success };
            res.render(template, options);
        }

        res.newRender = (template, options) => {
            options = {...options, errors, success };
            res.render(template, options);
        }

        next();
    });
}