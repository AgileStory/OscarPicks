'use strict';
/*jslint node: true, nomen: true */

var appDataRepository = require('../data/application');

module.exports = function (req, res, next) {

    res = res || {};

    appDataRepository.isLocked(function (err, isLocked) {

        if (err) {
            console.error(err);
        } else {

            req.appIsLocked = isLocked;

            next();
        }
    });
};
