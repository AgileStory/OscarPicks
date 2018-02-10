'use strict';
/*jslint node: true, nomen: true */

var _ = require('underscore');
var userData = require('../data/user');

function skipMaster(req) {
    return _.any(['/api', '/components', '/css', '/js', '/build'], function (url) {
        return req.url.substr(0, url.length) === url;
    });
}

function handler(title) {

    return function (req, res, next) {

        if (skipMaster(req)) {
            return next();
        }

        res.render('master', { title: title, userData: req.userData });

        userData.logUserRequest(req.userData);
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
