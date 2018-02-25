'use strict';

/*jslint browser: true, nomen: true */

var AppLayoutView = require('./views/appLayout');
var Backbone = require('backbone');
var CategoriesCollection = require('../collections/categories');
var CategoryController = require('./controllers/category');
var CategoryRouter = require('./routers/category');
var Marionette = require('backbone.marionette');
var PickController = require('./controllers/pick');
var PickRouter = require('./routers/pick');
var ResultController = require('./controllers/result');
var ResultRouter = require('./routers/result');
var UserController = require('./controllers/user');
var UserRouter = require('./routers/user');
var UserModel = require('../models/user');

module.exports = Marionette.Application.extend({

    initialize: function () {

        this.CategoryController = new CategoryController({ application: this });
        this.CategoryRouter = new CategoryRouter({ controller: this.CategoryController });

        this.PickController = new PickController({ application: this });
        this.PickRouter = new PickRouter({ controller: this.PickController });

        this.ResultController = new ResultController({ application: this });
        this.ResultRouter = new ResultRouter({ controller: this.ResultController });

        this.UserController = new UserController({ application: this });
        this.UserRouter = new UserRouter({ controller: this.UserController });
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

    showMainView: function (view) {
        this.layout.showChildView("Main", view);
    },

    showPicksMainView: function () {
        this.PickController.list();
    },

    showResultsMainView: function () {
        this.ResultController.list();
    },

    showUserMainView: function () {
        this.UserController.list();
    }
});
