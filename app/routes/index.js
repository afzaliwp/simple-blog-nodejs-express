const adminRouter = require('./admin');
const authRouter = require('./auth');
const authMiddleware = require('@middlewares/auth');
const guestMiddleware = require('@middlewares/guest');
module.exports = app => {
    app.use('/admin', [authMiddleware], adminRouter);
    app.use('/auth', [guestMiddleware], authRouter);
}