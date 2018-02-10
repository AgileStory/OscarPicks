var _ = require('underscore');
var client = require('./../client');

function skipMaster (req) {
    return _.any(['/api', '/components', '/css', '/js', '/build'], function (url) {
        return req.url.substr(0, url.length) === url;
    });
}

function hander(title, mainJs, mainCss) {
    return function (req, res, next) {
        if (skipMaster(req)) {
            return next();
        }

        var userId = '';

        if (req.header('x-ms-client-principal-name') !== undefined) {
            userId = req.header('x-ms-client-principal-name');
        }

        res.render('master', { title: title, userId: userId ,mainJs: mainJs, mainCss: mainCss});
    };
}

module.exports = {
	development: function () {
		return hander('SPA Boilerplate | Development', '/js/main.js', '/css/main.css');
	},

	production: function () {
		return hander('SPA Boilerplate | Production', client.js, client.css);
	}
};
