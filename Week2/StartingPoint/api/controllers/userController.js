/*
The User Controller holds all of the functions that relate to the users table in the database.
These will be called by the userRoutes
*/
'use strict';
var mongoose = require('mongoose');
var User     = require('../models/userModel.js');
var Counters = require('./countersController.js');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var config = require('../../config');

/*
HTTP POST   
Function to be called by the /signup route of the API.
Creates a user with all of the properties passed in by the request.
Then get id from the couunter controller and save to the database.
*/
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
            else
                res.json({ message: 'Success' });
        });

    }).
    catch(function(err) {
        console.log(err);
        res.json({ message: 'Failure' });
    });
};

/*
HTTP POST
Function to be called by the /login route of the API.
Finds the first matched user in the database(email should be unique so this shouldn't matter).
Hashes the password from the request and compares it with that user's password in the database.
If the password is correct, pass back a token for future authentication.
*/
exports.signIn = function(req, res) {
    User.findOne({email: req.body.email}).
    then(function(matchedUser){
        if(passwordHash.verify(req.body.password, matchedUser.password)) {
            var token = jwt.sign({iss: "rmu-acm", email: matchedUser.email},
                                  config.jwtSecret,
                                  {expiresIn: 60});

            res.json({ message: 'Success', authToken: token});
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

/*
HTTP GET
Function to be called by the /users route of the API.
Gets a list of all users in the database. 
Requires authentication.
*/
exports.getAllUsers = function(req, res) {
    User.find(function(err, users) {
        if(err) {
            console.log(err);
            res.json({message: 'Failure'});
        } else {
            res.json(users);
        }

    });
};