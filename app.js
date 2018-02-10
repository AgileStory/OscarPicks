'use strict';
/*eslint node: true, nomen: true */

var expressApp = require('./configure-express');
var http = require('http');

var mongoose = require('mongoose');

var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/oscarPicks';

mongoose.connect(mongoUrl);

var env = process.env.NODE_ENV || 'development';

// api endpoinds
//require('./source/api/auth')(app);
//require('./source/api/emails')(app);
//require('./source/api/contacts')(app);
//require('./source/api/tasks')(app);

http.createServer(expressApp).listen(expressApp.get('port'), function () {
    var environment = process.env.NODE_ENV || 'development';
    console.log('Oscar Picks started: ' + expressApp.get('port') + ' (' + environment + ')');
});
