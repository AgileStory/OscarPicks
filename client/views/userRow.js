'use strict';

var Marionette = require('backbone.marionette');
var Template = require('../templates/userRow.handlebars');

module.exports = Marionette.View.extend({

    tagName: 'tr',

    template: Template

});
