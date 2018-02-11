'use strict';
/*jslint node: true, nomen: true */

var userDataRepository = require('../data/user');

module.exports = {

    getUser: function (req, res, next) {

        req = req || {};

        userDataRepository.get(req.userModel.get('_id'), function (err, userModel) {

            if (err) {
                console.error(err);
            } else {

                res.json(userModel.toJSON());

                next();
            }
        });
    },

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
