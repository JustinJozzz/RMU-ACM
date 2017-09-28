/*
User schemas here. Define what data types and characteristics user properties should have. 
Enforces uniformity of data within database.
*/
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    id: {
        type: Number,
        unique: true
    },
    fName: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'First name is required'
    }, 
    lName: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Last name is required'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required'
    },
    password: {
        type: String,
        required: 'Password address is required'
    }
});

module.exports = mongoose.model('User', UserSchema);