'use strict';

/*jslint nomen: true */

var Categories = require('../../collections/categories');
var Category = require('../../models/category');
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
        self.listenTo(view, "childview:childview:delete:category", function (child, e) { self._deleteCategory(child, e); });

        self._showMainView(view);
    },

    _addCategory: function (childView) {

        var category, self;
        
        self = this;

        category = new Category({ name: childView.$('input[name=category-name]').val(), sort_order: self.application.categories.length });

        category.save(null, {
            success: function (model, response) {
                self.application.categories.add(new Category(response));
                self.list();
            }
        });
    },

    _deleteCategory: function (childView) {

        var self = this;

        childView.model.destroy({
            success: function () {
                self.application.categories.remove(childView.model);
                self.list();
            }
        });
    },

    _showMainView: function (view) {
        this.application.layout.showChildView("Main", view);
    },

    _updateUrl: function (url) {
        this.application.router.navigate(url);
    }
});
