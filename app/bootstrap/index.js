const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
module.exports = app => {
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '../../views');
    app.use(express.static(path.join(__dirname, '../../public')));
}