'use strict';
/*jslint node: true, nomen: true */

var Category = require('../models/category');
var repository = require('../data/category');

module.exports = {

    createCategory: function (req, res, next) {

        var category = new Category(req.body);

        repository.create(category, function (err, categoryModel) {

            if (err) {
                console.error(err);
            } else {
                res.status(201).json(categoryModel.toJSON());
                next();
            }
        });
    },

    deleteCategory: function (req, res, next) {

        repository.delete(req.params.id, function (err) {

            if (err) {
                console.error(err);
            } else {

                var response = {
                    message: "Category successfully deleted",
                    id: req.params.id
                };

                res.status(200).send(response);
                next();
            }
        });
    },

    list: function (req, res, next) {

        req = req || {};

        repository.list(function (err, categories) {

            if (err) {
                console.error(err);
            } else {

                res.json(categories);

                next();
            }
        });
    },

    updateCategory: function (req, res, next) {

        var category = new Category(req.body);

        repository.update(category, function (err, categoryModel) {

            if (err) {
                console.error(err);
            } else {
                res.status(201).json(categoryModel.toJSON());
                next();
            }
        });
    }
};
