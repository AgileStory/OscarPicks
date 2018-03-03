'use strict';

var Marionette = require('backbone.marionette');
var Template = require('../templates/entryRow.handlebars');

module.exports = Marionette.View.extend({

    className: 'card mt-3',

    tagName: 'div',

    template: Template,

    triggers: {
        "click .delete-entry": "delete:entry",
        "click .mark-winner": "mark:winner"
    },

    initialize: function (options) {
        this.application = options.application;
    },

    templateContext: function () {

        var context = {};

        context.is_locked = this.application.IsLocked;

        return context;
    }
});
