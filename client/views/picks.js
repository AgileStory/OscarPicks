'use strict';

var Marionette = require('backbone.marionette');
var PickRowView = require('../views/pickRow');
var Template = require('../templates/picks.handlebars');

var TableBody = Marionette.CollectionView.extend({

    childView: PickRowView,

    tagName: 'div',

    childViewOptions: function () {

        var self = this;

        return {
            application: self.application
        };
    },

    initialize: function (options) {
        this.application = options.application;
    }
});

module.exports = Marionette.View.extend({

    className: 'picks',

    tagName: 'div',

    template: Template,

    regions: {
        list: {
            el: '#pick-list'
        }
    },

    initialize: function (options) {
        this.application = options.application;
    },

    onRender: function () {
        this.showChildView('list', new TableBody({
            application: this.application,
            collection: this.collection
        }));
    }
});
