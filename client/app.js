'use strict';

/*jslint browser: true, nomen: true */

var AppLayoutView = require('./views/appLayout');
var Backbone = require('backbone');
var CategoriesCollection = require('../collections/categories');
var CategoryController = require('./controllers/category');
var CategoryRouter = require('./routers/category');
var HomeController = require('./controllers/home');
var HomeRouter = require('./routers/home');
var Marionette = require('backbone.marionette');
var PickController = require('./controllers/pick');
var PickRouter = require('./routers/pick');
var ScoreController = require('./controllers/score');
var ScoreRouter = require('./routers/score');
var UserController = require('./controllers/user');
var UserRouter = require('./routers/user');
var UserModel = require('../models/user');

module.exports = Marionette.Application.extend({

    getEntryNameById: function (id) {
        return this.entryNamesMap[id];
    },

    initialize: function () {

        this.IsLocked = window.appIsLocked;

        this.CategoryController = new CategoryController({ application: this });
        this.CategoryRouter = new CategoryRouter({ controller: this.CategoryController });

        this.PickController = new PickController({ application: this });
        this.PickRouter = new PickRouter({ controller: this.PickController });

        this.ScoreController = new ScoreController({ application: this });
        this.ScoreRouter = new ScoreRouter({ controller: this.ScoreController });

        this.UserController = new UserController({ application: this });
        this.UserRouter = new UserRouter({ controller: this.UserController });

        this.HomeController = new HomeController({ application: this });
        this.HomeRouter = new HomeRouter({ controller: this.HomeController });
    },

    onBeforeStart: function () {

        var self = this;

        this.userModel = new UserModel({ _id: window.userId });

        this.userModel.fetch({
            success: function () {

                self.categories = new CategoriesCollection();

                self.categories.fetch({
                    success: function () {

                        self.categories.populateEntryNamesMap(self);

                        self.layout = new AppLayoutView({ model: self.userModel, application: self });
                        //self.listenTo(self.layout, "all", function (eventName) { console.log(eventName); });
                        self.listenTo(self.layout, "show:categories", function () { self.showCategoriesMainView(); });
                        self.listenTo(self.layout, "show:home", function () { self.showHomeMainView(); });
                        self.listenTo(self.layout, "show:picks", function () { self.showPicksMainView(); });
                        self.listenTo(self.layout, "show:scores", function () { self.showScoresMainView(); });
                        self.listenTo(self.layout, "show:users", function () { self.showUserMainView(); });
                        self.listenTo(self.layout, "render", function () {

                            self.layoutRendered = true;

                            Backbone.history.start({ pushState: true });
                        });
                        self.layout.render();
                    }
                });
            }
        });
    },

    showCategoriesMainView: function () {
        this.CategoryController.list();
    },

    showDefaultMainView: function () {
        this.showPicksMainView();
    },

    showHomeMainView: function () {
        this.HomeController.home();
    },

    showMainView: function (view) {
        this.layout.showChildView("Main", view);
    },

    showPicksMainView: function () {
        this.PickController.list();
    },

    showScoresMainView: function () {
        this.ScoreController.list();
    },

    showUserMainView: function () {
        this.UserController.list();
    }
});
