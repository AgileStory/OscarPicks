'use strict';

var EntryRowView = require('../views/entryRow');
var Marionette = require('backbone.marionette');
var Template = require('../templates/editCategory.handlebars');

var TableBody = Marionette.CollectionView.extend({

    childView: EntryRowView,

    tagName: 'div',

    childViewOptions: function () {

        var self = this;

        return {
            application: self.application
        };
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

    initialize: function (options) {
        this.application = options.application;
    },

    onRender: function () {

        this.showChildView('list', new TableBody({
            collection: this.model.getEntries(),
            application: this.application
        }));
    }
});
