var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
	  res.send(req.headers);
});

app.listen(port, function () {
	  console.log('Example app listening on port ' + port + '!');
});
