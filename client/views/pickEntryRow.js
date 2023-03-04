'use strict';

var Marionette = require('backbone.marionette');
var Template = require('../templates/pickEntryRow.handlebars');

module.exports = Marionette.View.extend({

    className: 'card mt-3',

    tagName: 'div',

    template: Template,

    triggers: {
        "click .first-pick": "pick:first",
        "click .second-pick": "pick:second"
    }
});
