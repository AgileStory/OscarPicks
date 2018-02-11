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
var UserModel = require('../models/user');

module.exports = {

    get: function (userId, callback) {

        User.findById(userId, function (err, user) {
            if (err) {
                callback(err, undefined);
            } else {
                callback(undefined, new UserModel(user));
            }
        });
    },

    list: function (callback) {

        User.find(function (err, users) {
            if (err) {
                callback(err, undefined);
            } else {
                callback(undefined, users);
            }
        });
    },

    logUserRequest: function (userModel) {

        var self = this;

        User.findOneAndUpdate({ user_id: userModel.get('user_id') }, { last_accessed: Date.now() }, function (err, data) {
            if (err) {
                console.error(err);
            } else {

                if (data === null) {
                    self._createUserRecord(userModel.get('user_id'));
                }
            }
        });
    },

    withUserModel: function (userId, callback) {

        var self = this;

        User.findOne({ user_id: userId }, function (err, data) {
            if (err) {
                console.error(err);
                callback(err, undefined);
            } else {
                if (data === undefined || data === null) {
                    self._createUserRecord(userId, function (createErr, createdData) {
                        callback(createErr, new UserModel(createdData));
                    });
                } else {
                    callback(undefined, new UserModel(data));
                }
            }
        });
    },

    _createUserRecord: function (userId, callback) {

        var userModel = new UserModel({ user_id: userId, last_accessed: Date.now() });

        User.create(userModel.toJSON(), function (err, data) {
            if (err) {
                console.error(err);
                callback(err, undefined);
            } else {
                callback(undefined, data);
            }
        });
    }
};
