const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ =require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({

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

//using regular and not arrow functions since we want to bind this function to the instance
UserSchema.methods.generateAuthToken = function(){

    var user = this;
    var access = 'auth';

    var token = jwt.sign({_id:user._id.toHexString(),access:access},'secret123').toString();

    if(user.tokens.length){

        user.tokens.concat([{
            access,
            token
        }]);

    }else{

        user.tokens = [{
            access,
            token
        }];
    }
    

    return user.save().then(()=>{
       
        return token;
    });

};

UserSchema.statics.findByToken = function(token){

    var User = this;
    var decoded;

    try{

        decoded = jwt.verify(token,'secret123');
    }catch(e){

        return Promise.reject();
    }

    return User.findOne({

        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'

    });
};

UserSchema.pre('save',function(next){

    var user = this;

    if(user.isModified('password')){

        bcrypt.genSalt(10,(err,salt)=>{

            bcrypt.hash(user.password,salt,(err,hash)=>{

                user.password = hash;
                next();
            });
            
        });

    }else{
        next();
    }
})

UserSchema.methods.toJSON = function(){

    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id','mobileNumber','firstName','middleName','lastName']);//
};

var User = mongoose.model('Users',UserSchema);

module.exports = {

    User:User
};