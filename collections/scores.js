'use strict';

var Backbone = require('backbone');
var Score = require('../models/score');

module.exports = Backbone.Collection.extend({

    model:  Score,

    sort_key: 'score',

    url: "/scores",

    comparator: function (model) {
        return -1 * model.get(this.sort_key);
    }
});
