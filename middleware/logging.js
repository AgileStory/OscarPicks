'use strict';
/*jslint node: true, nomen: true */

var userData = require('../data/user');

module.exports = function (req, res, next) {

    res = res || {};

    userData.logUserRequest(req.userModel);

    next();
};
