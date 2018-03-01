'use strict';
/*jslint node: true, nomen: true */

var userDataRepository = require('../data/user');
var UserModel = require('../models/user');

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
    },

    update: function (req, res, next) {

        var user = new UserModel(req.body);

        if (req.userModel.get('_id').toString() === user.get('_id').toString()) {

            if (user.has('display_name') && user.get('display_name') !== undefined) {
                req.userModel.set('display_name', user.get('display_name'));
            }

            req.userModel.set('picks', user.getPicks());

            userDataRepository.update(req.userModel, function (err, userModel) {

                if (err) {
                    console.error(err);
                    next();
                } else {
                    res.status(201).json(userModel.toJSON());
                    next();
                }
            });

        } else {
            console.error('user id did not match authorized user');
            res.status(403).send('Users can only edit their own information');
            next();
        }
    }
};
