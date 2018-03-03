'use strict';
/*jslint node: true, nomen: true */

var appDataRepository = require('../data/application');
var ApplicationModel = require('../models/application');

module.exports = {

    updateLock: function (req, res, next) {

        var applicationModel = new ApplicationModel(req.body);

        if (req.userModel.isAdmin()) {

            if (applicationModel.get('is_locked')) {

                appDataRepository.lock(function (err, isLocked) {

                    if (err) {
                        console.error(err);
                        next();
                    } else {
                        res.status(201).json({ is_locked: isLocked });
                        next();
                    }
                });

            } else {

                appDataRepository.unlock(function (err, isLocked) {

                    if (err) {
                        console.error(err);
                        next();
                    } else {
                        res.status(201).json({ is_locked: isLocked });
                        next();
                    }
                });
            }

        } else {
            console.error('only admins can lock the application');
            res.status(403).send('Only admins can lock the application');
            next();
        }
    }
};
