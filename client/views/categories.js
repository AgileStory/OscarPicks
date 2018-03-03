'use strict';

var CategoryRowView = require('../views/categoryRow');
var Marionette = require('backbone.marionette');
var Template = require('../templates/categories.handlebars');

var TableBody = Marionette.CollectionView.extend({

    childView: CategoryRowView,
   
    tagName: 'div',

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


    className: 'categories',

    tagName: 'div',

    template: Template,

    regions: {
        list: {
            el: '#category-list'
        },
        newEntry: {
            el: '#new-entry'
        }
    },

    triggers: {
        "submit #add-category": "add:category"
    },

    initialize: function (options) {
        this.application = options.application;
    },

    onRender: function () {
        this.showChildView('list', new TableBody({
            collection: this.collection,
            application: this.application
        }));
    }
});
