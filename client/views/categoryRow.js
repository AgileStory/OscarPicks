'use strict';

var Marionette = require('backbone.marionette');
var Template = require('../templates/categoryRow.handlebars');

module.exports = Marionette.View.extend({

    className: 'card mt-3',

    tagName: 'div',

    template: Template,

    triggers: {
        "click .delete-category": "delete:category"
    }
});
