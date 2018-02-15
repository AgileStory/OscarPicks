'use strict';

/*jslint nomen: true */

var ListView = require('../views/picks');
var Marionette = require('backbone.marionette');
var Picks = require('../../collections/picks');

module.exports = Marionette.Object.extend({

    initialize: function (options) {
        this.application = options.application;
    },

    list: function () {

        var self, picks, view;

        self = this;

        picks = new Picks();

        picks.fetch({
            success: function (collection) {

                view = new ListView({ collection: collection });

                self._showMainView(view);
                // self._updateUrl("/users");
            }
        });
    },

    _showMainView: function (view) {
        this.application.layout.showChildView("Main", view);
    },

    _updateUrl: function (url) {
        this.application.router.navigate(url);
    }
});
