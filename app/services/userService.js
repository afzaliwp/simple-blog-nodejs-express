const gravatar = require('gravatar');

exports.getAvatar = (userEmail, options = null) => {
    return gravatar.url(userEmail, options);
}