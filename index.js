const http = require('http');
const express = require('express');
const morgan = require('morgan')
require('dotenv').config()

// const mongoose = require('mongoose')
// const mongoSettings = require('./models/settings/mongoSettings')
// const getMongoDb = require('./models/mongoDb');
const mongooseConnect = require('./models/mongooseConnect')
mongooseConnect()
const router = express.Router();
const app = express();
app.use(morgan('short'))
app.use(express.json())
app.set('port', process.env.PORT || 3001);
app.use(express.static(__dirname + '/views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', (req, res) => {
    req.app.render('index', (err, html) => {
        if (err) {
            res.end("<h1>EJS ERROR!</h1>");
            return;
        }
        res.end(html);
    })
})
app.post('/location', (req, res) => {
    console.log('inside')
    console.log(req.body)

})
// app.use('/location', require('./routers/location'))

// 404
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500).json({ err })
    console.log('reached the end...')
    console.log()
});

app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('http://localhost:%d', app.get('port'));
    console.log()
    // getUserList()
});