'use strict';
/*jslint node: true, nomen: true */

var userDataRepository = require('../data/user');

module.exports = {

    list: function (req, res, next) {

        req = req || {};

        userDataRepository.list(function (err, users) {

            if (err) {
                console.error(err);
            } else {

                res.json(users);

                next();
            }
        });
    }
};
