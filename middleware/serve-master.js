'use strict';
/*jslint node: true, nomen: true */

var _ = require('underscore');

function shouldSkipMaster(req) {

    var shouldSkip = false;

    if (req.xhr) {
        shouldSkip = true;
    } else {
        shouldSkip = _.any(['/css', '/js', '/build'], function (url) {
            return req.url.substr(0, url.length) === url;
        });
    }

    return shouldSkip;
}

function handler(title, appJavascriptPath) {

    return function (req, res, next) {

        if (shouldSkipMaster(req)) {
            return next();
        }

        res.render('master', { title: title, isLocked: req.appIsLocked, userModel: req.userModel, appJavascriptPath: appJavascriptPath });
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
