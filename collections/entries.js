'use strict';

var Backbone = require('backbone');
var Entry = require('../models/entry');

module.exports = Backbone.Collection.extend({

    model:  Entry,

    sort_key: 'sort_order',

    url: "/entries",

    comparator: function (model) {
        return model.get(this.sort_key);
    }
});
