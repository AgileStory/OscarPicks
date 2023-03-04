'use strict';

/*jslint nomen: true */

var Backbone = require('backbone');
var moment = require('moment');
var Pick = require('../models/pick');
var PicksCollection = require('../collections/picks');
var Score = require('../models/score');

module.exports = Backbone.Model.extend({

    idAttribute: "_id",

    urlRoot: "/users",

    displayTime: function (attributeName) {

        return moment(this.get(attributeName)).format();
    },

    getPicks: function (categoriesCollection) {

        var picks;

        if (!this.has('picks') || this.get('picks') === undefined) {

            picks = new PicksCollection();

            this.set('picks', picks);
        }

        if (this.get('picks').models === undefined) {
            this.set('picks', new PicksCollection(this.get('picks')));
        }

        if (categoriesCollection !== undefined) {
            this.get('picks').populateCategories(categoriesCollection);
        }

        return this.get('picks');
    },

    getScore: function (categoriesCollection) {

        var score = new Score();

        if (this.has('display_name') && this.get('display_name') !== '') {
            score.set('user_name', this.get('display_name'));
        } else {
            score.set('user_name', this.get('user_id'));
        }

        score.updateScore(this.getPicks(categoriesCollection), categoriesCollection);

        return score;
    },

    initialize: function (options) {

        options = options || {};
    },

    isAdmin: function () {
        return this.has('is_admin') && this.get('is_admin');
    },

    setPick: function (categoryId, entryId, firstOrSecond) {

        var pick = this.getPicks().get(categoryId);

        if (pick === undefined) {
            pick = new Pick({ _id: categoryId });
            this.getPicks().add(pick);
        }

        pick.set(firstOrSecond + '_pick_id', entryId);
    }
});
