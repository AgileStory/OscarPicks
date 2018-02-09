'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {

    var i, keys, html;

    html = '<html><body><p>Hello ' + req.header('x-ms-client-principal-name') + '</p>';

    html += '<table><thead><tr><th>Header</th><th>Value</th></tr></thead><tbody>';

    keys = Object.keys(req.headers);

    for (i = 0; i < keys.length; i = i + 1) {
        html += '<tr><td>' + keys[i] + '</td><td>' + req.header(keys[i]) + '</td></tr>';
    }

    html += '</tbody></table></html>';

    res.send(html);
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});
