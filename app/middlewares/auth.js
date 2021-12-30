 const userRoles = require('@models/users/userRoles');
 module.exports = (req, res, next) => {
     const user = req.session.user;

     if (!req.session.hasOwnProperty('user') || user.role == userRoles.SUBSCRIBER) {
         res.status(404).redirect('/404');
     }

     next();
 };