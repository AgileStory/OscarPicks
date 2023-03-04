'use strict';

/*jslint browser: true, nomen: true */

window.jQuery = window.$ = require('jquery');

window._ = require('underscore');

window.Popper = require('popper.js');
require('bootstrap');

var App = require('./app.js');

window.$(document).ready(function () {
    var app = new App();
    app.start();
});
