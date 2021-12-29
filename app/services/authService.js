const hashService = require('@services/hashService');
const userModel = require('@models/users');
const session = require('express-session');

exports.login = async(email, plainPassword) => {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
        return false;
    }

    const validPassword = hashService.comparePassword(plainPassword, user.password);
    if (!validPassword) {
        return false;
    }

    return user;
}