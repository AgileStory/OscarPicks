var _ = require('underscore');
var client = require('./../client');

function skipMaster (req) {
    return _.any(['/api', '/components', '/css', '/js', '/build'], function (url) {
        return req.url.substr(0, url.length) === url;
    });
}

function handler(title, mainJs, mainCss) {

    return function (req, res, next) {

        if (skipMaster(req)) {
            return next();
        }

        var userId = 'Jared (local dev)';

        if (req.header('x-ms-client-principal-name') !== undefined) {
            userId = req.header('x-ms-client-principal-name');
        }

        res.render('master', { title: title, userId: userId });
    };
}

module.exports = {
	development: function () {
		return handler('Oscar Picks | Development');
	},

	production: function () {
		return handler('Oscar Picks');
	}
};
