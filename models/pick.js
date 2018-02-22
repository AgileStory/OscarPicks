'use strict';

var Backbone = require('backbone');
var EntriesCollection = require('../collections/entries');
var moment = require('moment');

module.exports = Backbone.Model.extend({

    idAttribute: "_id",

    displayTime: function (attributeName) {

        return moment(this.get(attributeName)).format();
    },

    getEntries: function (categoriesCollection) {

        var category, entries, self;

        self = this;

        category = categoriesCollection.get(this.id);

        entries = new EntriesCollection();

        category.getEntries().each(function (entry) {

            entry.set('is_first_pick', entry.id === self.get('first_pick_id'));

            entry.set('is_second_pick', entry.id === self.get('second_pick_id'));

            entry.set('parent_category_id', category.id);

            entries.add(entry);
        });

        return entries;
    }
});
