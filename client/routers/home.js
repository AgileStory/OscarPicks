'use strict';

/*jslint nomen: true */

var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({

    appRoutes: {
        'home': 'home',
        '*path': 'default',
    },

    initialize: function (options) {
        this.controller = options.controller;
    }
});
