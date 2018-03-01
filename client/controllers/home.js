'use strict';

/*jslint nomen: true */

var Cookies = require('js-cookie');
var HomeView = require('../views/home');
var Marionette = require('backbone.marionette');

module.exports = Marionette.Object.extend({

    initialize: function (options) {
        this.application = options.application;
    },

    default: function () {

        if (Cookies.get('skip-home') === 'true') {
            this.application.PickController.list();
        } else {
            this.home();
        }
    },

    home: function () {

        var self, view;

        self = this;

        view = new HomeView({ model: self.application.userModel, application: self.application });
        //self.listenTo(view, "all", function (eventName) { console.log(eventName); });
        self.listenTo(view, "skip:home", function () { self._skipHome(); });
        self.listenTo(view, "update:displayname", function (child, e) { self._updateDisplayName(child, e); });

        self._showMainView(view);
        self._updateUrl('/home');
    },

    _showMainView: function (view) {
        this.application.showMainView(view);
    },

    _skipHome: function () {
        Cookies.set('skip-home', 'true');
        this.default();
    },

    _updateDisplayName: function (childView) {

        var self = this;

        this.application.userModel.set('display_name', childView.$('input[name=display-name]').val());

        this.application.userModel.save(null, {
            success: function () {
                self.home();
            }
        });
    },

    _updateUrl: function (url) {
        this.application.HomeRouter.navigate(url);
    }
});
