'use strict';
/*eslint node: true, nomen: true */

require('dotenv').config();

var app = require('./configure-express');
var http = require('http');

// routes
require('./routes/user')(app);

// api endpoinds
//require('./source/api/auth')(app);
//require('./source/api/emails')(app);
//require('./source/api/contacts')(app);
//require('./source/api/tasks')(app);

http.createServer(app).listen(app.get('port'), function () {
    var environment = process.env.NODE_ENV || 'development';
    console.log('Oscar Picks started: ' + app.get('port') + ' (' + environment + ')');
});
