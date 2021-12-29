const bcrypt = require('bcrypt');

exports.hashPassword = (plainPassword, salt = 10) => {
    return bcrypt.hashSync(plainPassword, salt);
}

exports.comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}