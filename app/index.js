const express = require('express');
const app = express();

require('./bootstrap')(app);

app.get('/', (req, res) => {
    res.render('index', { layout: false, userName: 'MA90' });
});

module.exports = () => {
    const port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log('listening on port ' + port);
    })
}