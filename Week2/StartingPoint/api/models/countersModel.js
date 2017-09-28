/*
Counter schemas here. Define what data types and characteristics Counter properties should have. 
Enforces uniformity of data within database.
*/
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CounterSchema   = new Schema({
    _id: {
        type: String,
        unique: true
    },
    sequenceValue: Number
});

module.exports = mongoose.model('Counters', CounterSchema);