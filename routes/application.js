'use strict';

var express = require('express');
var router = express.Router();
var applicationController = require('../controllers/application');

module.exports = function (app) {

    router.post('/', applicationController.updateLock);

    app.use('/application', router);
};
