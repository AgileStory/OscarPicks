'use strict';

var Backbone = require('backbone');
var EntriesCollection = require('../collections/entries');
var moment = require('moment');

module.exports = Backbone.Model.extend({

    idAttribute: "_id",

    urlRoot: "/categories",

    getEntries: function () {

        if (!this.has('entries') || this.get('entries') === undefined) {
            this.set('entries', new EntriesCollection());
        }

        if (this.get('entries').models === undefined) {
            this.set('entries', new EntriesCollection(this.get('entries')));
        }

        return this.get('entries');
    },

    initialize: function (options) {

        options = options || {};

        if (!this.has('entries') || this.get('entries') === undefined) {
            this.set('entries', new EntriesCollection());
        }
    }
});
