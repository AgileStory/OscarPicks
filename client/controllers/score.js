'use strict';

/*jslint nomen: true */

var Backbone = require('backbone');
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
            success: function (collection, response, xhr) {

                console.log(collection);
                console.log(response);
                console.log(xhr);

                view = new ListView({ collection: collection });

                self._showMainView(view);
                self._updateUrl('/scores');

                self._queueRefresh();
            }
        });
    },

    _queueRefresh: function () {

        var self = this;

        setTimeout(function () { self._refresh(); }, 5000);
    },

    _refresh: function () {

        if (Backbone.history.getFragment() === 'scores') {
            this.list();
        }
    },

    _showMainView: function (view) {
        this.application.showMainView(view);
    },

    _updateUrl: function (url) {
        this.application.ScoreRouter.navigate(url);
    }
});
