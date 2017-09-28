/*
Middleware to authorize routes. 
Checks for a token. If one exists, then verify that it isn't expired and decode.
Else, deny the user access. Probably redirect them to the signup page.
*/
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