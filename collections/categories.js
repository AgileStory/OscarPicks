'use strict';

var Backbone = require('backbone');
var Category = require('../models/category');

module.exports = Backbone.Collection.extend({

    model:  Category,

    sort_key: 'sort_order',

    url: "/categories",

    comparator: function (model) {
        return model.get(this.sort_key);
    },

    populateEntryNamesMap: function (application) {

        application.entryNamesMap = {};

        this.each(function (category) {
            category.getEntries().each(function (entry) {
                application.entryNamesMap[entry.id] = entry.get('name');
            });
        });
    }
});
