'use strict';

var Marionette = require('backbone.marionette');
var Template = require('../templates/pickRow.handlebars');

module.exports = Marionette.View.extend({

    className: 'card mt-3',

    tagName: 'div',

    template: Template,

    triggers: {
        "click ": "edit:pick"
    }
});