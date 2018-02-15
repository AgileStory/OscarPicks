'use strict';
/*jslint node: true, nomen: true */

var _ = require('underscore');

function skipMaster(req) {
    return _.any(['/api', '/categories', '/components', '/css', '/js', '/build', '/users'], function (url) {
        return req.url.substr(0, url.length) === url;
    });
}

function handler(title, appJavascriptPath) {

    return function (req, res, next) {

        if (skipMaster(req)) {
            return next();
        }

        res.render('master', { title: title, userModel: req.userModel, appJavascriptPath: appJavascriptPath });
    };
}

module.exports = {

    development: function () {
        return handler('Oscar Picks | Development', 'bundle.debug.js');
    },

    production: function () {
        return handler('Oscar Picks', 'bundle.min.js');
    }
};
