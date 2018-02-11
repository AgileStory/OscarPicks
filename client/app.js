'use strict';

/*jslint browser: true, nomen: true */

var AppLayoutView = require('./views/appLayout');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var ResultController = require('./controllers/result');
var UserController = require('./controllers/user');
var UserModel = require('../models/user');

module.exports = Marionette.Application.extend({

    initialize: function () {
        this.router = new Marionette.AppRouter({ controller: this.controller });
    },

    onBeforeStart: function () {

        var self = this;

        this.userModel = new UserModel({ _id: window.userId });

        this.userModel.fetch({
            success: function () {
                self.layout = new AppLayoutView({ model: self.userModel });
                //self.listenTo(self.layout, "all", function (eventName) { console.log(eventName); });
                self.listenTo(self.layout, "show:results", function () { self.showResultsMainView(); });
                self.listenTo(self.layout, "show:users", function () { self.showUserMainView(); });
                self.listenTo(self.layout, "render", function () { self.showDefaultMainView(); });
                self.layout.render();
            }
        });
    },

    onStart: function () {
        Backbone.history.start({ pushState: true });
    },

    showDefaultMainView: function () {
        this.showResultsMainView();
    },

    showResultsMainView: function () {
        this.controller = new ResultController({ application: this });
        this.controller.list();
    },

    showUserMainView: function () {
        this.controller = new UserController({ application: this });
        this.controller.list();
    }
});
