var mongoose = require('mongoose');

var User = mongoose.model('Users',{

    mobileNumber:{
        type: Number,
        required: true
    },

    firstName: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },

    middleName: {
        type: String,
        trim: true,
        default: ''
    },

    lastName: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
});

module.exports = {

    User:User
};