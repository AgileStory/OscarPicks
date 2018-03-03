'use strict';
/*jslint node: true, nomen: true */

var mongoose = require('mongoose');

var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/oscarPicks';

mongoose.connect(mongoUrl);

var EntrySchema = new mongoose.Schema({
    name: String,
    description: String,
    is_winner: Boolean,
    sort_order: Number,
});

var CategorySchema = new mongoose.Schema({
    entries: [EntrySchema],
    name: String,
    sort_order: Number,
});

var CategoriesCollection = require('../collections/categories');
var Category = mongoose.model('Category', CategorySchema);
var CategoryModel = require('../models/category');
var Entry = mongoose.model('Entry', EntrySchema);

module.exports = {

    create: function (categoryModel, callback) {

        Category.create(categoryModel.toJSON(), function (err, data) {
            if (err) {
                callback(err, undefined);
            } else {
                callback(undefined, new CategoryModel(data));
            }
        });
    },

    delete: function (categoryId, callback) {

        Category.findByIdAndRemove(categoryId, function (err, data) {
            if (err) {
                callback(err, undefined);
            } else {
                callback(undefined, new CategoryModel(data));
            }
        });
    },

    get: function (id, callback) {

        Category.findById(id, function (err, category) {
            if (err) {
                callback(err, undefined);
            } else {
                callback(undefined, new CategoryModel(category));
            }
        });
    },

    list: function (callback) {

        var categories;

        Category.find(function (err, categoriesData) {
            if (err) {
                callback(err, undefined);
            } else {

                categories = new CategoriesCollection(categoriesData);

                callback(undefined, categories);
            }
        });
    },

    update: function (categoryModel, callback) {

        var category = new Category(categoryModel.toJSON());

        category.entries = [];

        categoryModel.getEntries().each(function (entryModel) {
            category.entries.push(new Entry(entryModel.toJSON()));
        });

        Category.findByIdAndUpdate(
            categoryModel.get('_id'),
            category,
            { upsert: true, new: true },
            function (err, savedCategory) {
                if (err) {
                    callback(err, undefined);
                } else {
                    callback(undefined, new CategoryModel(savedCategory));
                }
            }
        );
    }
};
