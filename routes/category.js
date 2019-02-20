'use strict';

var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category');
var multer  = require('multer');
var upload = multer();

module.exports = function (app) {

    router.delete('/:id', categoryController.deleteCategory);
    router.get('/', categoryController.list);
    router.post('/import', upload.single('categories-json'), categoryController.importCategories);
    router.post('/', categoryController.createCategory);
    router.put('/:id', categoryController.updateCategory);

    app.use('/categories', router);
};
