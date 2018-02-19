'use strict';

var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category');

module.exports = function (app) {

    router.delete('/:id', categoryController.deleteCategory);
    router.get('/', categoryController.list);
    router.post('/', categoryController.createCategory);
    router.put('/:id', categoryController.updateCategory);

    app.use('/categories', router);
};
