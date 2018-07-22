var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/User');

var app = express();

app.use(bodyParser.json());

app.post('/users',(req,res) => {

    //console.log(req.body);

    console.log("req.body.mobileNumber.... "+req.body.mobileNumber);

    /*var user = new User({

        mobileNumber:req.body.mobileNumber,
        firstName:req.body.firstName,
        middleName:req.body.middleName,
        lastName:req.body.lastName
    });*/

    var user = new User(req.body);

    user.save().then((doc) => {

        console.log("User Saved Successfully ",doc);
        res.status(200).send(doc);

    },(err) => {

        console.log("Failed To Save User",err);
        res.status(400).send(err);
    });
});

app.listen(9000,() => {

    console.log("Started on Port 9000");
});