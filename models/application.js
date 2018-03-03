'use strict';

/*jslint nomen: true */

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    idAttribute: "_id",

    urlRoot: "/application",

    lock: function (callback) {
        this.set('is_locked', true);

        this.save(null, {
            success: function () {
                callback();
            }
        });
    },

    unlock: function (callback) {
        this.set('is_locked', false);

        this.save(null, {
            success: function () {
                callback();
            }
        });
    }
});
