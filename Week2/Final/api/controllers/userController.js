'use strict';
var mongoose = require('mongoose');
var User     = require('../models/userModel.js');
var Counters = require('./countersController.js');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var config = require('../../config');

exports.createUser = function(req, res) {
    var user = User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: passwordHash.generate(req.body.password)
    });

    Counters.nextID("users").
    then(function(userId) {
        user.id = userId;
    
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Success' });
        });
    }).
    catch(function(err) {
        console.log(err);
        res.json({ message: 'Failure' });
    });
};

exports.signIn = function(req, res) {
    User.findOne({email: req.body.email}).
    then(function(matchedUser){
        if(passwordHash.verify(req.body.password, matchedUser.password)) {
            res.json({ message: 'Success', authToken: jwt.sign({iss: "rmu-acm", email: matchedUser.email}, config.jwtSecret, {expiresIn: 240}) });
        }
        else {
            res.json({message: 'Failure'});
        }
    }).
    catch(function(err) {
        console.log(err);
        res.json({ message: 'Failure' });
    });
};

exports.getAllUsers = function(req, res) {
    User.find(function(err, users) {
        if(err) {
            console.log(err);
            res.json({message: 'Failure'});
        }

        res.json(users);
    });
};