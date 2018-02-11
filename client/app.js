'use strict';

/*jslint browser: true, nomen: true */

var AppLayoutView = require('./views/appLayout');
var Backbone = require('backbone');
var DefaultController = require('./controllers/user');
var Marionette = require('backbone.marionette');
var UserModel = require('../models/user');

module.exports = Marionette.Application.extend({

    initialize: function () {
        this.controller = new DefaultController({ application: this });
        this.router = new Marionette.AppRouter({ controller: this.controller });
    },

    onBeforeStart: function () {
        this.layout = new AppLayoutView();
        this.layout.render();
    },

    onStart: function () {

        var self = this;

        Backbone.history.start({ pushState: true });

        this.userModel = new UserModel({ _id: window.userId });

        this.userModel.fetch({
            success: function () {
                self.controller.list();
            }
        });
    }
});
