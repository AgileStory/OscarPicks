'use strict';

var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category');

module.exports = function (app) {

    router.get('/', categoryController.list);
    router.post('/', categoryController.createCategory);
    router.delete('/:id', categoryController.deleteCategory);

    app.use('/categories', router);
};
