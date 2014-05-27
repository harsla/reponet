/*jslint node: true es5: true nomen: true*/
"use strict";

var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash');

var configDB = require('./config/database.js');

// connect to the DB
mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.configure(function () {
    // express
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
  
    // templating
    app.set('view engine', 'ejs');

    // passport
    app.use(express.session({secret: 'rinchanrinchanrinchan'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

});

// give routes the app and passport
require('./app/routes.js')(app, passport);

// start the app
app.listen(port);
console.log('app running on port ' + port);
