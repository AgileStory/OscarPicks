
var Marionette = require('backbone.marionette');
var Template = require('../templates/appLayout.handlebars');

module.exports = Marionette.View.extend({

    template: Template,

    el: "#app-layout",

    regions: {
        "Header" : "#header",
        "Main" : "#main"
    }
});
