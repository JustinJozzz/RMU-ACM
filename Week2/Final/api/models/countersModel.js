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