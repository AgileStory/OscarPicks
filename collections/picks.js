'use strict';

var Backbone = require('backbone');
var Pick = require('../models/pick');

module.exports = Backbone.Collection.extend({

    model:  Pick,

    url: "/users"
});
