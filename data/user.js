'use strict';
/*jslint node: true, nomen: true */

var mongoose = require('mongoose');

var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/oscarPicks';

mongoose.connect(mongoUrl);

var UserSchema = new mongoose.Schema({
    user_id: String,
    last_accessed: { type: Date, default: Date.now },
});

var User = mongoose.model('User', UserSchema);

module.exports = {

    logUserRequest: function (userData) {

        var self = this;

        User.findOneAndUpdate({ user_id: userData.user_id }, { last_accessed: Date.now() }, function (err, data) {
            if (err) {
                console.error(err);
            } else {

                if (data === null) {
                    self._createUserRecord(userData.user_id);
                }
            }
        });
    },

    withUserData: function (userId, callback) {

        var self = this;

        User.findOne({ user_id: userId }, function (err, data) {
            if (err) {
                console.error(err);
                callback(err, undefined);
            } else {
                if (data === undefined || data === null) {
                    self._createUserRecord(userId, function (createErr, createdData) {
                        callback(createErr, createdData);
                    });
                } else {
                    callback(undefined, data);
                }
            }
        });
    },

    _createUserRecord: function (userId, callback) {

        User.create({ user_id: userId }, function (err, data) {
            if (err) {
                console.error(err);
                callback(err, undefined);
            } else {
                callback(undefined, data);
            }
        });
    }
};
