'use strict';

var Marionette = require('backbone.marionette');
var Template = require('../templates/appLayout.handlebars');

module.exports = Marionette.View.extend({

    template: Template,

    el: "#app-layout",

    regions: {
        "Header" : "#header",
        "Main" : "#main"
    },

    triggers: {
        "click .nav-categories": "show:categories",
        "click .nav-picks": "show:picks",
        "click .nav-results": "show:results",
        "click .nav-users": "show:users",
        "click .navbar-brand": "show:home"
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
