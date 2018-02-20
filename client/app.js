'use strict';

/*jslint browser: true, nomen: true */

var AppLayoutView = require('./views/appLayout');
var Backbone = require('backbone');
var CategoriesCollection = require('../collections/categories');
var CategoryController = require('./controllers/category');
var Marionette = require('backbone.marionette');
var PickController = require('./controllers/pick');
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

                self.categories = new CategoriesCollection();

                self.categories.fetch({
                    success: function () {

                        self.layout = new AppLayoutView({ model: self.userModel });
                        //self.listenTo(self.layout, "all", function (eventName) { console.log(eventName); });
                        self.listenTo(self.layout, "show:categories", function () { self.showCategoriesMainView(); });
                        self.listenTo(self.layout, "show:picks", function () { self.showPicksMainView(); });
                        self.listenTo(self.layout, "show:results", function () { self.showResultsMainView(); });
                        self.listenTo(self.layout, "show:users", function () { self.showUserMainView(); });
                        self.listenTo(self.layout, "render", function () { self.showDefaultMainView(); });
                        self.layout.render();
                    }
                });
            }
        });
    },

    onStart: function () {
        Backbone.history.start({ pushState: true });
    },

    showCategoriesMainView: function () {
        this.controller = new CategoryController({ application: this });
        this.controller.list();
    },

    showDefaultMainView: function () {
        this.showPicksMainView();
    },

    showPicksMainView: function () {
        this.controller = new PickController({ application: this });
        this.controller.list();
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
