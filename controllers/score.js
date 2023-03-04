'use strict';
/*jslint node: true, nomen: true */

var categoryRepository = require('../data/category');
var Score = require('../models/score');
var scoreRepository = require('../data/score');
var ScoresCollection = require('../collections/scores');
var userRepository = require('../data/user');

module.exports = {

    list: function (req, res, next) {

        req = req || {};

        scoreRepository.list(function (err, collection) {

            if (err) {
                console.error(err);
            } else {

                res.json(collection);

                next();
            }
        });
    },

    updateScores: function (callback) {

        var self = this;

        categoryRepository.list(function (err, categoriesCollection) {

            if (err) {
                callback(err);
            } else {

                userRepository.list(function (err2, usersCollection) {

                    if (err2) {
                        callback(err2);
                    } else {
                        self._updateScores(categoriesCollection, usersCollection, function (err3) {
                            callback(err3);
                        });
                    }
                });
            }
        });
    },

    _updateScores: function (categoriesCollection, usersCollection, callback) {

        var scoresCollection = new ScoresCollection();

        scoreRepository.deleteAll(function (err) {
            if (err) {
                callback(err);
            } else {

                usersCollection.each(function (userModel) {
                    scoresCollection.add(userModel.getScore(categoriesCollection));
                });

                scoreRepository.createAll(scoresCollection, function (createErr) {
                    callback(createErr);
                });
            }
        });
    }
};
