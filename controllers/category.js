'use strict';
/*jslint node: true, nomen: true */

var Category = require('../models/category');
var repository = require('../data/category');
var scoresController = require('../controllers/score');

module.exports = {

    createCategory: function (req, res, next) {

        if (req.userModel.isAdmin() && !req.appIsLocked) {

            var category = new Category(req.body);

            repository.create(category, function (err, categoryModel) {

                if (err) {
                    console.error(err);
                } else {
                    res.status(201).json(categoryModel.toJSON());
                    next();
                }
            });

        } else {
            res.status(403).send('Only admins can manage categories in unlocked apps');
            next();
        }
    },

    deleteCategory: function (req, res, next) {

        if (req.userModel.isAdmin() && !req.appIsLocked) {
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
        } else {
            res.status(403).send('Only admins can manage categories in unlocked apps');
            next();
        }
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

        if (req.userModel.isAdmin()) {
            repository.update(category, function (err, categoryModel) {

                if (err) {
                    console.error(err);
                } else {

                    scoresController.updateScores(function (updateError) {
                        if (updateError) {
                            console.error(updateError);
                        } else {
                            res.status(201).json(categoryModel.toJSON());
                            next();
                        }
                    });
                }
            });
        } else {
            res.status(403).send('Only admins can manage categories');
            next();
        }
    }
};
