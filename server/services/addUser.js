const {mongoose} = require('mongoose');
const {User} = require('../models/user');
const _ = require('lodash');

const addUser = (req,res) =>{

    var body = _.pick(req.body,['firstName','middleName', 'lastName', 'mobileNumber', 'password']);
    var user = new User(body);

    user.save().then((doc) => {
        
        return user.generateAuthToken();

    }).then((token)=>{

        res.header('x-auth',token).send(user);

    }).catch((err)=>{

        res.status(400).send();
    });

}

module.exports = {addUser};