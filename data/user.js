'use strict';
/*jslint node: true, nomen: true */

var mongoose = require('mongoose');

var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/oscarPicks';

mongoose.connect(mongoUrl);

var UserSchema = new mongoose.Schema({
    is_admin: Boolean,
    last_accessed: { type: Date, default: Date.now },
    user_id: String,
});

var User = mongoose.model('User', UserSchema);
var UserCollection = require('../collections/users');
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

        var self, users;
        
        self = this;

        User.find(function (err, usersData) {
            if (err) {
                callback(err, undefined);
            } else {

                users = new UserCollection(usersData);

                if (users.length === 1 && !users.at(0).get('is_admin')) {
                    self.makeAdmin(users.at(0), function (err, userModel) {
                        callback(undefined, users);
                    });
                } else {
                    callback(undefined, users);
                }
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

    makeAdmin: function (userModel, callback) {

        var self = this;

        User.findOneAndUpdate({ user_id: userModel.get('user_id') }, { is_admin: true }, function (err, data) {
            if (err) {
                callback(err, new UserModel(data));
            } else {
                if (data === null) {
                    self._createUserRecord(userModel.get('user_id'), function (createErr, createData) {
                        callback(undefined, new UserModel(createData));
                    });
                } else {
                    callback(undefined, new UserModel(data));
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
