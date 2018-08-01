
const _ = require('lodash');
const {User} = require('../models/user');

const login = (req,res) =>{

    var body = _.pick(req.body,['mobileNumber','password']);
    
    User.findByCredentials(body.mobileNumber,body.password).then((user)=>{

     return user.generateAuthToken().then((token)=>{
        res.header('x-auth',token).send(user);
      });

    }).catch((e)=>{

      res.status(400).send();

    });
 }
 
 module.exports = {login};