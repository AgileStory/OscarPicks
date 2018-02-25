'use strict';

/*jslint nomen: true */

var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({

    appRoutes: {
        'categories': 'list'
    },

    initialize: function (options) {
        this.controller = options.controller;
    }
});
