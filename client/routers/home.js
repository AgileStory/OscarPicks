'use strict';

/*jslint nomen: true */

var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({

    appRoutes: {
        '': 'default',
        'home': 'home',
    },

    initialize: function (options) {
        this.controller = options.controller;
    }
});
