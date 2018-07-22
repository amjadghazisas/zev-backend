var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/User');
var {findOneQuery} = require('./db/queries/mongoose-queries');

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

app.get('/xxx',(req,res) => {

    findOneQuery(User,{firstName:"Ajay"},res);    
    
});

app.listen(9000,() => {

    console.log("Started on Port 9000");
});