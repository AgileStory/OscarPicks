'use strict';
/*jslint node: true, nomen: true */

var userDataRepository = require('../data/user');

module.exports = function (req, res, next) {

    res = res || {};
    
    /*
    req.userId = process.env.USER_OVERRIDE || 'Jared (local dev)';

    if (req.header('x-ms-client-principal-name') !== undefined) {
        req.userId = req.header('x-ms-client-principal-name');
    }
    */
    
    if(!req.user) {
        res.redirect('/auth');
    } else {

        userDataRepository.withUserModelByPassportData(req.user, function (err, userModel) {

            if (err) {
                console.error(err);
            } else {

                req.userModel = userModel;

                next();
            }
        });
    }
};
