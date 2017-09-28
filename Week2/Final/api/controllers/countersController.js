var mongoose = require('mongoose');
var Counters     = require('../models/CountersModel.js');

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