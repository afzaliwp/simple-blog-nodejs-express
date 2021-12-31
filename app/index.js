const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('req-flash');

const app = express();
require('./bootstrap')(app);

app.use(cookieParser());
app.use(session({
    saveUninitialized: false,
    secret: 'fs984urf09pu4r4fk345pf',
    resave: false,
    name: 'my-simple-blog-session'
}));
app.use(flash());

require('@middlewares')(app);
require('@routes')(app);

module.exports = () => {
    const port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log('listening on port ' + port);
    })
}