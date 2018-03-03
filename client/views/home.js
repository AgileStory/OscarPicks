'use strict';

var Marionette = require('backbone.marionette');
var Template = require('../templates/home.handlebars');

module.exports = Marionette.View.extend({

    className: 'picks',

    tagName: 'div',

    template: Template,

    triggers: {
        "submit #update-displayname": "update:displayname",
        "click #skip-home": "skip:home",
        "click #lock": "lock",
        "click #unlock": "unlock"
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
