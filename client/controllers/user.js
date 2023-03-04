'use strict';

/*jslint nomen: true */

var ListView = require('../views/users');
var Marionette = require('backbone.marionette');
var Users = require('../../collections/users');

module.exports = Marionette.Object.extend({

    initialize: function (options) {
        this.application = options.application;
    },

    list: function () {

        var self, users, view;

        self = this;

        users = new Users();

        users.fetch({
            success: function (collection) {

                view = new ListView({ collection: collection });

                self._showMainView(view);
                self._updateUrl("/users");
            }
        });
    },

    _showMainView: function (view) {
        this.application.showMainView(view);
    },

    _updateUrl: function (url) {
        this.application.UserRouter.navigate(url);
    }
});
