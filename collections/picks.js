'use strict';

/*jslint nomen: true */

var Backbone = require('backbone');
var Pick = require('../models/pick');

module.exports = Backbone.Collection.extend({

    model:  Pick,

    sort_key: 'sort_order',

    comparator: function (model) {
        return model.get(this.sort_key);
    },

    populateCategories: function (categoriesCollection) {

        var pick, self;

        self = this;

        categoriesCollection.each(function (category) {

            if (self.get(category.id) === undefined) {

                pick = new Pick({ _id: category.id, name: category.get('name') });

                self.add(pick);
            } else if (self.get(category.id).get('name') !== category.get('name')) {
                pick.set('name', category.get('name'));
            }
        });
    }
});
