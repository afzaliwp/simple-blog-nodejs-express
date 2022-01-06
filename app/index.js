const express = require('express');
const cookieParser = require('cookie-parser');
const flash = require('req-flash');
const app = express();
require('./bootstrap')(app);

app.use(cookieParser());
app.use(flash());

require('@middlewares')(app);
require('@routes')(app);

module.exports = () => {
    const port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log('listening on port ' + port);
    })
}