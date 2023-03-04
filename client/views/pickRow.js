'use strict';

var Marionette = require('backbone.marionette');
var Template = require('../templates/pickRow.handlebars');

module.exports = Marionette.View.extend({

    className: 'card mt-3',

    tagName: 'div',

    template: Template,

    triggers: {
        "click ": "edit:pick"
    },

    initialize: function (options) {
        this.application = options.application;
    },

    templateContext: function () {

        var context = {};

        if (this.model.has('first_pick_id') && this.model.has('second_pick_id') && this.model.get('first_pick_id') === this.model.get('second_pick_id')) {
            context.combined_pick_name = this.application.getEntryNameById(this.model.get('first_pick_id'));
        } else {
            if (this.model.has('first_pick_id')) {
                context.first_pick_name = this.application.getEntryNameById(this.model.get('first_pick_id'));
            }
            if (this.model.has('second_pick_id')) {
                context.second_pick_name = this.application.getEntryNameById(this.model.get('second_pick_id'));
            }
        }

        return context;
    }
});
