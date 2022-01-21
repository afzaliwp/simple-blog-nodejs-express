const adminRouter = require('./admin');
const authRouter = require('./auth');
const frontRouter = require('./front');
const authMiddleware = require('@middlewares/auth');
const guestMiddleware = require('@middlewares/guest');
const logoutController = require('@controllers/auth/logout');

module.exports = app => {
    app.use('/', frontRouter);
    app.use('/admin', [authMiddleware], adminRouter);
    app.use('/auth', [guestMiddleware], authRouter);
    app.get('/logout', logoutController.logout);
}