'use strict';

var EntryRowView = require('../views/entryRow');
var Marionette = require('backbone.marionette');
var Template = require('../templates/editCategory.handlebars');

var TableBody = Marionette.CollectionView.extend({
    childView: EntryRowView,
    tagName: 'div'
});

module.exports = Marionette.View.extend({

    className: 'edit-category',

    tagName: 'div',

    template: Template,

    regions: {
        list: {
            el: '#entry-list'
        },
        newEntry: {
            el: '#new-entry'
        }
    },

    triggers: {
        "submit #add-entry": "add:entry"
    },

    onRender: function () {

        this.showChildView('list', new TableBody({
            collection: this.model.getEntries()
        }));
    }
});
