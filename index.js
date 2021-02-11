const http = require('http');
const express = require('express');
const morgan = require('morgan')
const proj4 = require('proj4')
require('dotenv').config()

// const mongoose = require('mongoose')
// const mongoSettings = require('./models/settings/mongoSettings')
// const getMongoDb = require('./models/mongoDb');

// need to see the connection message!
const mongooseConnect = require('./models/mongooseConnect')
mongooseConnect()

const router = express.Router();
const app = express();
app.use(morgan('short'))
app.use(express.json())
// to have an access to form data
// Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 3006);
app.use(express.static(__dirname + '/views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    req.app.render('index', (err, html) => {
        if (err) {
            res.end("<h1>EJS ERROR!</h1>");
            return;
        }
        res.end(html);
    })
})

app.get('/convert', (req, res) => {
    // var firstProjection = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"; //from
    // var secondProjection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"; //to
    // //I'm not going to redefine those two in latter examples.
    // // console.log(proj4(firstProjection, secondProjection, [966623.6, 1943447.0])); // Convert 하려는 좌표
    // // console.log(proj4(firstProjection, secondProjection, [195145.69751196, 448523.135020422])); // Convert 하려는 좌표
    // console.log(proj4(firstProjection, secondProjection, [448523.135020422, 195145.69751196])); // Convert 하려는 좌표
    // // console.log('GRS80_UTM-K.html');     
    // // res.sendFile(path.join(__dirname + '/pages-test/GRS80_UTM-K.html'));
    // res.end();

    // console.log(proj4.defs)
    // console.log(proj4)

    proj4.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";//제공되는 좌표 
    proj4.defs["EPSG:2097"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"

    // console.log(proj4.defs["EPSG:2097"])

    var tm2097 = proj4.Proj(proj4.defs["EPSG:2097"])
    var grs80 = proj4.Proj(proj4.defs["EPSG:5179"])
    var wgs84 = proj4.Proj(proj4.defs["EPSG:4326"]); //경위도 

    // var p = proj4.toPoint([945959.0381341814, 1953851.7348996028]);//한국지역정보개발원 좌표 
    var p = proj4.toPoint([195145.69751196, 448523.135020422]);//
    console.log('before p', p)

    p = proj4.transform(tm2097, wgs84, p);
    console.log('after p', p)

    console.log('coords', p.x, p.y)

    document.write(p.x + " " + p.y);
})

app.use('/location', require('./routers/location'))

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