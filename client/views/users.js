'use strict';

var Marionette = require('backbone.marionette');
var Template = require('../templates/users.handlebars');
var UserRowView = require('../views/userRow');

var TableBody = Marionette.CollectionView.extend({
    childView: UserRowView,
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
