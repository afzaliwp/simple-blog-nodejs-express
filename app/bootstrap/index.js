const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
let sessionStore = require('./session-handler/redis')(session);

module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.engine('handlebars', hbs.engine({ layout: 'layouts' }));
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'));
    app.use('/static', express.static(path.join(__dirname, '../../public')));
    app.use(session({
        store: sessionStore,
        saveUninitialized: false,
        secret: 'fs984urf09pu4r4fk345pf',
        resave: false,
        name: 'my-simple-blog-session',
        unset: 'destroy'
    }));
}