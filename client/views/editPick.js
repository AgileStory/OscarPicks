'use strict';

var EntryRowView = require('../views/pickEntryRow');
var Marionette = require('backbone.marionette');
var Template = require('../templates/editPick.handlebars');

var TableBody = Marionette.CollectionView.extend({
    childView: EntryRowView,
    tagName: 'div'
});

module.exports = Marionette.View.extend({

    className: 'edit-pick',

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

    initialize: function (options) {
        this.application = options.application;
    },

    onRender: function () {

        this.showChildView('list', new TableBody({
            collection: this.model.getEntries(this.application.categories)
        }));
    }
});
