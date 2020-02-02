'use strict';
/*jslint node: true, nomen: true */

var CategoriesCollection = require('../collections/categories');
var Category = require('../models/category');
var repository = require('../data/category');
var scoresController = require('../controllers/score');

module.exports = {

    createCategory: function (req, res, next) {

            console.log('createCategory');
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

          console.log('deleteCategory');
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

    importCategories: function (req, res, next) {

        var categories, file, json;
        console.log('importCategories');

        if (req.userModel.isAdmin() && !req.appIsLocked) {

          file = req.file;

          json = JSON.parse(file.buffer.toString());

          //console.log(json);
          categories = new CategoriesCollection(json);
          
          console.log(categories.length);
          
          var response = {
              message: "Categories imported"
          };

          res.status(200).send(response);
          next();

        } else {
          res.status(403).send('Only admins can manage categories in unlocked apps');
          next();
        }
    },

    list: function (req, res, next) {

            console.log('listCategories');
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
            console.log('updateCategory');

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
