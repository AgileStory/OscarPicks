'use strict';

/*jslint nomen: true */

var ListView = require('../views/scores');
var Marionette = require('backbone.marionette');
var Scores = require('../../collections/scores');

module.exports = Marionette.Object.extend({

    initialize: function (options) {
        this.application = options.application;
    },

    list: function () {

        var self, scores, view;

        self = this;

        scores = new Scores();

        scores.fetch({
            success: function (collection) {

                view = new ListView({ collection: collection });

                self._showMainView(view);
                self._updateUrl('/scores');
            }
        });
    },

    _showMainView: function (view) {
        this.application.showMainView(view);
    },

    _updateUrl: function (url) {
        this.application.ScoreRouter.navigate(url);
    }
});
