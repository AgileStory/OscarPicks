'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/score');

module.exports = function (app) {

    router.get('/', controller.list);

    app.use('/scores', router);
};
