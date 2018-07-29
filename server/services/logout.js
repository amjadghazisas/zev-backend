
const _ = require('lodash');
const {User} = require('../models/user');

const logout = (req,res) =>{

   req.user.removeToken(req.token).then(()=>{

        res.status(200).send();
   },(err)=>{

        res.status(400).send()
   });
 }
 
 module.exports = {logout};