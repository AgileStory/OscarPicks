'use strict';

/*jslint nomen: true */

var ApplicationModel = require('../../models/application');
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
        self.listenTo(view, "lock", function (child, e) { self._lock(child, e); });
        self.listenTo(view, "unlock", function (child, e) { self._unlock(child, e); });

        self._showMainView(view);
        self._updateUrl('/home');
    },

    _lock: function () {

        var self = this;

        new ApplicationModel().lock(function () {
            self.application.IsLocked = true;
            self.home();
        });
    },

    _showMainView: function (view) {
        this.application.showMainView(view);
    },

    _skipHome: function () {
        Cookies.set('skip-home', 'true');
        this.default();
    },

    _unlock: function () {

        var self = this;

        new ApplicationModel().unlock(function () {
            self.application.IsLocked = false;
            self.home();
        });
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
