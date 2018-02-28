'use strict';

/*jslint nomen: true */

var EditView = require('../views/editPick');
var ListView = require('../views/picks');
var Marionette = require('backbone.marionette');
var Picks = require('../../collections/picks');

module.exports = Marionette.Object.extend({

    initialize: function (options) {
        this.application = options.application;
    },

    edit: function (id) {

        var model = this.application.userModel.getPicks(this.application.categories).get(id);

        this._editPick(model);
    },

    list: function () {

        var self, view;

        self = this;

        view = new ListView({ collection: self.application.userModel.getPicks(self.application.categories), application: self.application });
        self.listenTo(view, "childview:childview:edit:pick", function (child, e) { self._editPick(child.model, e); });

        self._showMainView(view);
        self._updateUrl('/picks');
    },

    _editPick: function (model) {

        var self, view;

        self = this;

        view = new EditView({ model: model, application: self.application });
        //self.listenTo(view, "all", function (eventName) { console.log(eventName); });
        self.listenTo(view, "childview:childview:pick:first", function (child) { self._pick(child.model, 'first', model); });
        self.listenTo(view, "childview:childview:pick:second", function (child) { self._pick(child.model, 'second', model); });

        self._showMainView(view);
        self._updateUrl('/pick/' + model.id);
    },

    _pick: function (entryModel, pickType, pickModel) {

        var self = this;

        this.application.userModel.setPick(entryModel.get('parent_category_id'), entryModel.id, pickType);

        this.application.userModel.save(null, {
            success: function () {
                self._editPick(self.application.userModel.getPicks(self.application.categories).get(pickModel.id));
            }
        });
    },

    _showMainView: function (view) {
        this.application.showMainView(view);
    },

    _updateUrl: function (url) {
        this.application.PickRouter.navigate(url);
    }
});
