module.exports = (session) => {
    const MySQLStore = require('express-mysql-session')(session);
    const options = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
        clearExpired: true
    };
    return new MySQLStore(options);
}