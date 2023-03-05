'use strict';
/*jslint node: true, nomen: true */

var mongoose = require('mongoose');

var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/oscarPicks';

mongoose.connect(mongoUrl);

var ScoreSchema = new mongoose.Schema({
    score: Number,
    user_name: String,
    user_image_url: String,
}, { versionKey: false });

var Score = mongoose.model('Score', ScoreSchema);
var ScoreModel = require('../models/score');
var ScoresCollection = require('../collections/scores');

module.exports = {

    createAll: function (scoreCollection, callback) {

        Score.create(scoreCollection.toJSON(), function (err, data) {
            if (err) {
                callback(err, undefined);
            } else {
                callback(undefined, new ScoresCollection(data));
            }
        });
    },

    deleteAll: function (callback) {
        Score.remove({}, callback);
    },

    list: function (callback) {

        var scores;

        Score.find(function (err, scoresData) {
            if (err) {
                callback(err, undefined);
            } else {

                scores = new ScoresCollection(scoresData);

                callback(undefined, scores);
            }
        });
    }
};
