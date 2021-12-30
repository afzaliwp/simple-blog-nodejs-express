const adminRouter = require('./admin');
const authRouter = require('./auth');
const authMiddleware = require('@middlewares/auth');
module.exports = app => {
    app.use('/admin', [authMiddleware], adminRouter);
    app.use('/auth', authRouter);
}