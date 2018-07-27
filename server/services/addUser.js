const {mongoose} = require('mongoose');
const {User} = require('../models/user');
const _ = require('lodash');

const addUser = (req,res) =>{

    var body = _.pick(req.body,['firstName','middleName', 'lastName', 'mobileNumber', 'password']);
    var user = new User(body);

    user.save().then((doc) => {

        console.log("User Saved Successfully ",doc);
        res.status(200).send(doc);

    },(err) => {

        console.log("Failed To Save User",err);
        res.status(400).send(err);
    });

}

module.exports = {addUser};