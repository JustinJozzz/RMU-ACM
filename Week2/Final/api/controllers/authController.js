'use strict';
var jwt = require('jsonwebtoken');
var config = require('../../config');

exports.verifyToken = function(req, res, next) {
    var token = req.body.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.jwtSecret, function(err, decoded) {
            if(err) {
                console.log(err);
                return res.json({message: "Failure"});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({message: "Failure"});
    }
};