'use strict';

/*jslint nomen: true */

var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({

    appRoutes: {
        '': 'list',
        'picks': 'list',
        'pick/:id': 'edit'
    },

    initialize: function (options) {
        this.controller = options.controller;
    }
});
