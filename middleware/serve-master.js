'use strict';
/*jslint node: true, nomen: true */

var _ = require('underscore');

function shouldSkipMaster(req) {

    if (req.xhr) {
        return true;
    } else {
        return _.any(['/css', '/js', '/build'], function (url) {
            return req.url.substr(0, url.length) === url;
        });
    }
}

function handler(title, appJavascriptPath) {

    return function (req, res, next) {

        if (shouldSkipMaster(req)) {
            return next();
        }

        res.render('master', { title: title, userModel: req.userModel, appJavascriptPath: appJavascriptPath });
    };
}

module.exports = {

    development: function () {
        return handler('Oscar Picks | Development', '/bundle.debug.js');
    },

    production: function () {
        return handler('Oscar Picks', '/bundle.min.js');
    }
};
