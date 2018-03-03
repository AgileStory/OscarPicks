'use strict';
/*jslint node: true, nomen: true */

var mongoose = require('mongoose');

var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/oscarPicks';

mongoose.connect(mongoUrl);

var ApplicationSchema = new mongoose.Schema({
    is_locked_for_scoring: { type: Boolean, default: false },
});

var Application = mongoose.model('Application', ApplicationSchema);

module.exports = {

    isLocked: function (callback) {

        var self = this;

        Application.find(function (err, data) {
            if (err) {
                callback(err, undefined);
            } else {
                if (data === undefined || data.length === 0) {
                    self._createRecord(callback);
                } else {
                    callback(undefined, data[0].is_locked_for_scoring);
                }
            }
        });
    },

    lock: function (callback) {

        Application.findOneAndUpdate({ is_locked_for_scoring: false }, { is_locked_for_scoring: true }, function (err, data) {
            if (err) {
                callback(err, undefined);
            } else {
                callback(undefined, data.is_locked_for_scoring);
            }
        });
    },

    unlock: function (callback) {

        Application.findOneAndUpdate({ is_locked_for_scoring: true }, { is_locked_for_scoring: false }, function (err, data) {
            if (err) {
                callback(err, undefined);
            } else {
                callback(undefined, data.is_locked_for_scoring);
            }
        });
    },

    _createRecord: function (callback) {

        Application.create({ is_locked_for_scoring: false }, function (err, data) {
            if (err) {
                callback(err, undefined);
            } else {
                callback(undefined, data.is_locked_for_scoring);
            }
        });
    }
};
