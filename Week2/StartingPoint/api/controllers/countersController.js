/*
The Counters Controller holds all of the functions that relate to the counters table in the database.
*/
var mongoose = require('mongoose');
var Counters     = require('../models/CountersModel.js');

/*
This function is to be called by other controllers, so they can get the next unique id in their sequence.
*/
exports.nextID = function(name) {
    return new Promise(
        function(resolve, reject) {
            Counters.findOne({_id: name}).then(function(sequence){
                sequence.sequenceValue += 1;
                var nextVal = sequence.sequenceValue;
        
                sequence.save(function(err) {
                    if (err)
                        reject(new Error(err));
                    resolve(nextVal);
                });
            });
        }
    );
};