'use strict';

var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

module.exports = function (app) {

    router.get('/', userController.list);
    router.get('/:id', userController.getUser);
    router.put('/:id', userController.update);

    app.use('/users', router);
};
