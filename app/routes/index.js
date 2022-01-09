const adminRouter = require('./admin');
const authRouter = require('./auth');
const authMiddleware = require('@middlewares/auth');
const guestMiddleware = require('@middlewares/guest');
const logoutController = require('@controllers/auth/logout');
const homeController = require('@controllers/front/home');
module.exports = app => {
    app.get('/', homeController.index);
    app.use('/admin', [authMiddleware], adminRouter);
    app.use('/auth', [guestMiddleware], authRouter);
    app.get('/logout', logoutController.logout);
}