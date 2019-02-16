'use strict';
/*jslint node: true, nomen: true */

var mongoose = require('mongoose');

var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/oscarPicks';

mongoose.connect(mongoUrl);

var PickSchema = new mongoose.Schema({
    name: String,
    first_pick_id: String,
    second_pick_id: String,
}, { versionKey: false });

var UserSchema = new mongoose.Schema({
    display_name: String,
    is_admin: { type: Boolean, default: false },
    last_accessed: { type: Date, default: Date.now },
    picks: [PickSchema],
    score: Number,
    user_id: String,
}, { versionKey: false });

var Pick = mongoose.model('Pick', PickSchema);
var User = mongoose.model('User', UserSchema);
var UserCollection = require('../collections/users');
var UserModel = require('../models/user');

module.exports = {

    get: function (userId, callback) {

        var self, userModel;

        self = this;

        User.findById(userId, function (err, user) {
            if (err) {
                callback(err, undefined);
            } else {

                userModel = new UserModel(user);

                if (userModel.get('user_id') === process.env.ADMIN_OVERRIDE && !userModel.isAdmin()) {
                    self.makeAdmin(userModel, function (makeAdminErr) {
                        callback(makeAdminErr, userModel);
                    });
                } else {
                    callback(undefined, userModel);
                }
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

                if (users.length === 1 && !users.at(0).isAdmin()) {
                    self.makeAdmin(users.at(0), function (makeAdminErr) {
                        callback(makeAdminErr, users);
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
                        callback(createErr, new UserModel(createData));
                    });
                } else {
                    callback(undefined, new UserModel(data));
                }
            }
        });
    },

    update: function (userModel, callback) {

        var user = new User(userModel.toJSON());

        user.picks = [];

        userModel.getPicks().each(function (pickModel) {
            user.picks.push(new Pick(pickModel.toJSON()));
        });

        User.findByIdAndUpdate(
            userModel.get('_id'),
            user,
            { upsert: true, new: true },
            function (err, savedUser) {
                if (err) {
                    callback(err, undefined);
                } else {
                    callback(undefined, new UserModel(savedUser));
                }
            }
        );
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

        var userModel = new UserModel({ user_id: userId, is_admin: false, score: 0, last_accessed: Date.now() });

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
