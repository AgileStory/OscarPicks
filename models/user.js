'use strict';

var Backbone = require('backbone');
var moment = require('moment');
var PicksCollection = require('../collections/picks');

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

            picks.populateCategories(categoriesCollection);

            this.set('picks', picks);
        }

        if (this.get('picks').models === undefined) {
            this.set('picks', new PicksCollection(this.get('picks')));
        }

        return this.get('picks');
    },

    initialize: function (options) {

        options = options || {};
    },

    isAdmin: function () {
        return this.has('is_admin') && this.get('is_admin');
    }
});
