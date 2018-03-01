'use strict';

var Marionette = require('backbone.marionette');
var Template = require('../templates/home.handlebars');

module.exports = Marionette.View.extend({

    className: 'picks',

    tagName: 'div',

    template: Template,

    triggers: {
        "submit #update-displayname": "update:displayname",
        "click #skip-home": "skip:home"
    },

    initialize: function (options) {
        this.application = options.application;
    }
});
