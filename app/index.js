const express = require('express');
const session = require('express-session');

const app = express();
require('./bootstrap')(app);
app.use(session({
    saveUninitialized: false,
    secret: 'fs984urf09pu4r4fk345pf',
    resave: false,
    name: 'my-simple-blog-session'
}));

require('@routes')(app);

module.exports = () => {
    const port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log('listening on port ' + port);
    })
}