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
    },

    getScore: function (categoriesCollection) {

        var score, winningEntry;

        winningEntry = categoriesCollection.getWinningEntry(this.id);

        score = 0;

        if (winningEntry !== undefined) {
            if (winningEntry.id.toString() === this.get('first_pick_id')) {
                score = score + 3;
            }
            if (winningEntry.id.toString() === this.get('second_pick_id')) {
                score = score + 1;
            }
        }

        return score;
    }
});
