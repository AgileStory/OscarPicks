'use strict';
/*jslint node: true, nomen: true */

var applicationState = require('./middleware/application');
var bodyParser = require('body-parser');
var express = require('express');
var favicon = require('serve-favicon');
var logging = require('./middleware/logging');
var path = require('path');
var serveMaster = require('./middleware/serve-master');
var user = require('./middleware/user');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');

var app = express();

var env = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(middleware.cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(express.logger('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//app.use(express.methodOverride());

// New auth stuff - start

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth' , passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
}));
app.get( '/auth/callback',
    passport.authenticate( 'google', {
        // successRedirect: '/auth/callback/success',
        successRedirect: '/home',
        failureRedirect: '/auth/callback/failure'
}));
app.get('/auth/callback/success' , (req , res) => {
    if(!req.user) {
        res.redirect('/auth/callback/failure');
    }
    res.send("Welcome " + req.user.displayName + 
    "<br><img src=\"" + req.user.picture + "\">" + 
    "<br>" + req.user.email);
});
app.get('/auth/callback/failure' , (req , res) => {
    res.send("Error");
});
// New auth stuff - end

app.use(applicationState);
app.use(user);
app.use(logging);

if ('development' === env) {
 //   app.use(express.errorHandler());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(serveMaster.development());
}

var oneMonth = 2678400000;
if ('production' === env) {
  //  app.use(express.compress());
    app.use(express.static(path.join(__dirname, 'public')));
    //app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneMonth }));
    app.use(serveMaster.production());
}

module.exports = app;
