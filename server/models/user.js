const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('Users',{

    mobileNumber:{
        type: String,
        required: true,
        unique: true,
        validate: {

            validator: (value)=>{

                validator.isMobilePhone(value,'en-IN',{strictMode:true})
            },
            message: '{VALUE} is not a valid mobile number'
        }
    },

    password:{

        type: String,
        required :true,
        minlength: 6
    },

    tokens:[

        {
            access:{
                type: String,
                required: true
            },
            token:{
                type: String,
                required: true
            }
        }
    ],

    firstName: {
        type: String,
        required: true,
        minlength: 1,
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
        minlength: 1,
        trim: true
    }
});

module.exports = {

    User:User
};