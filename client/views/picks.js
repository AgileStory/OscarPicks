'use strict';

var Marionette = require('backbone.marionette');
var PickRowView = require('../views/pickRow');
var Template = require('../templates/picks.handlebars');

var TableBody = Marionette.CollectionView.extend({
    childView: PickRowView,
    tagName: 'div'
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

    onRender: function () {
        this.showChildView('list', new TableBody({
            collection: this.collection
        }));
    }
});
