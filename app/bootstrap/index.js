const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
module.exports = app => {
    app.engine('handlebars', engine({ layout: 'layouts' }));
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'));
    app.use('/static', express.static(path.join(__dirname, '../../public')));
}