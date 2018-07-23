var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require ('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/User');
var {findOneQuery} = require('./db/queries/mongoose-queries');
var {findByIdQuery} = require('./db/queries/mongoose-queries');

var app = express();

app.use(bodyParser.json());

app.post('/users',(req,res) => {

    var user = new User(req.body);

    user.save().then((doc) => {

        console.log("User Saved Successfully ",doc);
        res.status(200).send(doc);

    },(err) => {

        console.log("Failed To Save User",err);
        res.status(400).send(err);
    });
});

app.get('/users',(req,res) => {

    User.find().then((docs)=>{

        res.send({users:docs});

    },(err)=>{

        res.status(400).send();
    });
    
});

app.get('/users/:userId',(req,res) => {

    var id = req.params.userId;
    findByIdQuery(User,id,res);
    
});

app.listen(9000,() => {

    console.log("Started on Port 9000");
});