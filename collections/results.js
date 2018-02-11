'use strict';

var Backbone = require('backbone');
var Result = require('../models/result');

module.exports = Backbone.Collection.extend({

    model:  Result,

    url: "/users"
});
