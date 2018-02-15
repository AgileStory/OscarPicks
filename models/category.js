'use strict';

var Backbone = require('backbone');
var moment = require('moment');

module.exports = Backbone.Model.extend({

    idAttribute: "_id",

    urlRoot: "/categories",

    initialize: function (options) {

        options = options || {};
    }
});
