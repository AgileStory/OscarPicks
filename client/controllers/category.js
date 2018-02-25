'use strict';

/*jslint nomen: true */

var _ = require('underscore');
var Categories = require('../../collections/categories');
var Category = require('../../models/category');
var EditView = require('../views/editCategory');
var Entry = require('../../models/entry');
var ListView = require('../views/categories');
var Marionette = require('backbone.marionette');

module.exports = Marionette.Object.extend({

    initialize: function (options) {
        this.application = options.application;
    },

    list: function () {

        var self, view;

        self = this;

        self.application.categories.sort();

        view = new ListView({ collection: self.application.categories });

        //self.listenTo(view, "all", function (eventName) { console.log(eventName); });
        self.listenTo(view, "add:category", function (child, e) { self._addCategory(child, e); });
        self.listenTo(view, "childview:childview:delete:category", function (child, e) { self._deleteCategory(child.model, e); });
        self.listenTo(view, "childview:childview:edit:category", function (child, e) { self._editCategory(child.model, e); });

        self._showMainView(view);
        self._updateUrl('/categories');
    },

    _addCategory: function (childView) {

        var category, self, sort_order;

        self = this;

        sort_order = 0;

        if (self.application.categories.length > 0) {
            sort_order = _.max(self.application.categories.pluck('sort_order')) + 1;
        }

        category = new Category({ name: childView.$('input[name=category-name]').val(), sort_order: sort_order });

        category.save(null, {
            success: function (model, response) {
                model = model || {};
                self.application.categories.add(new Category(response));
                self.list();
            }
        });
    },

    _addEntry: function (childView) {

        var category, entry, self, sort_order;

        self = this;

        category = childView.model;

        sort_order = 0;

        if (category.get('entries').length > 0) {
            sort_order = _.max(category.get('entries').pluck('sort_order')) + 1;
        }

        entry = new Entry({
            name: childView.$('input[name=entry-name]').val(),
            description: childView.$('input[name=entry-description]').val(),
            sort_order: sort_order
        });

        category.get('entries').add(entry);

        category.save(null, {
            success: function (model) {
                model = model || {};
                self._editCategory(category);
            }
        });
    },

    _deleteCategory: function (categoryModel) {

        var self = this;

        categoryModel.destroy({
            success: function () {
                self.application.categories.remove(categoryModel);
                self.list();
            }
        });
    },

    _deleteEntry: function (entryModel, categoryModel) {

        var self = this;

        categoryModel.getEntries().remove(entryModel);

        categoryModel.save(null, {
            success: function (model) {
                model = model || {};
                self._editCategory(categoryModel);
            }
        });
    },

    _editCategory: function (categoryModel) {

        var self, view;

        self = this;

        view = new EditView({ model: categoryModel });
        //self.listenTo(view, "all", function (eventName) { console.log(eventName); });
        self.listenTo(view, "add:entry", function (child, e) { self._addEntry(child, e); });
        self.listenTo(view, "childview:childview:delete:entry", function (child) { self._deleteEntry(child.model, categoryModel); });

        self._showMainView(view);
    },

    _showMainView: function (view) {
        this.application.showMainView(view);
    },

    _updateUrl: function (url) {
        this.application.CategoryRouter.navigate(url);
    }
});
