'use strict';

var Marionette = require('backbone.marionette');
var ScoreRowView = require('../views/scoreRow');
var Template = require('../templates/scores.handlebars');

var TableBody = Marionette.CollectionView.extend({
    childView: ScoreRowView,
    tagName: 'tbody'
});

module.exports = Marionette.View.extend({

    className: 'table',

    tagName: 'table',

    template: Template,

    regions: {
        body: {
            el: 'tbody',
            replaceElement: true
        }
    },

    onRender: function () {
        this.showChildView('body', new TableBody({
            collection: this.collection
        }));
    }
});
