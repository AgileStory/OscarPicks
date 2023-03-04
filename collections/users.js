'use strict';

var Backbone = require('backbone');
var User = require('../models/user');

module.exports = Backbone.Collection.extend({

    model:  User,

    url: "/users"
});
