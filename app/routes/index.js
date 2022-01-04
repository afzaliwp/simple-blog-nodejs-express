const adminRouter = require('./admin');
const authRouter = require('./auth');
const authMiddleware = require('@middlewares/auth');
const guestMiddleware = require('@middlewares/guest');
const logoutController = require('@controllers/auth/logout');
module.exports = app => {
    app.use('/admin', [authMiddleware], adminRouter);
    app.use('/auth', [guestMiddleware], authRouter);
    app.get('/logout', logoutController.logout);
}