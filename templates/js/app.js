'use strict';

var path = require('path');
var http = require('http');
var util = require('util');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proc = require('proc-utils');

var config = require('./config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '{views}');

app.enable('trust proxy');

app.set('host', config.host || 'localhost');
app.set('port', process.env.PORT || config.port || 3000);
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());{css}
app.use(express.static(path.join(__dirname, 'public')));

// initialize app controllers
require('./routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Create and start the web server
http.createServer(app)
    .on('error', function (err) {
        console.log(err);
        process.exit(1);
    })
    .listen(app.get('port'), function () {
        util.log("{name} webserver listening on port " + app.get('port') +
            ' in ' + app.get('env'));
    });

// initialize process management
proc.init(app);
