var bodyParser = require('body-parser');
var express = require('express');
var favicon = require('serve-favicon');
var http = require('http');
var path = require('path');
var middleware = require('./source/middleware');
var mongoose = require('mongoose');

var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/oscarPicks'

mongoose.connect(mongoUrl);

var app = express();

var env = process.env.NODE_ENV || 'development';

var oneMonth = 2678400000;

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(middleware.cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
//app.use(express.logger('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//app.use(express.methodOverride());

if ('development' == env) {
 //   app.use(express.errorHandler());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(middleware.serveMaster.development());
}

if ('production' == env) {
  //  app.use(express.compress());
    app.use(express.static(path.join(__dirname, 'public')));
    //app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneMonth }));
    app.use(middleware.serveMaster.production());
}

// api endpoinds
require('./source/api/auth')(app);
require('./source/api/emails')(app);
require('./source/api/contacts')(app);
require('./source/api/tasks')(app);

http.createServer(app).listen(app.get('port'), function(){
	var environment = process.env.NODE_ENV || 'development';
	console.log('Oscar Picks started: ' + app.get('port') + ' (' + environment + ')');
});
