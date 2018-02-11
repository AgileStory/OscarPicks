'use strict';

/*jslint nomen: true */

var ListView = require('../views/results');
var Marionette = require('backbone.marionette');
var Results = require('../../collections/results');

module.exports = Marionette.Object.extend({

    initialize: function (options) {
        this.application = options.application;
    },

    list: function () {

        var self, results, view;

        self = this;

        results = new Results();

        results.fetch({
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
