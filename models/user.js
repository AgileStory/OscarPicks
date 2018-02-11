'use strict';

var Backbone = require('backbone');
var moment = require('moment');

module.exports = Backbone.Model.extend({

    idAttribute: "_id",

    urlRoot: "/users",

    displayTime: function (attributeName) {

        return moment(this.get(attributeName)).format();
    },

    isAdmin: function () {
        return this.has('is_admin') && this.get('is_admin');
    }
});
