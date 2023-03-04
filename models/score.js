'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    idAttribute: "_id",

    urlRoot: "/scores",

    initialize: function (options) {

        options = options || {};
    },

    updateScore: function (picksCollection, categoriesCollection) {

        var score = 0;

        picksCollection.each(function (pick) {
            score = score + pick.getScore(categoriesCollection);
        });

        this.set('score', score);
    }
});
