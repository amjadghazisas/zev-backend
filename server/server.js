const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');//
const {findOneQuery} = require('./db/queries/mongoose-queries');
const {findByIdQuery} = require('./db/queries/mongoose-queries');
const {removeAll, removeById, removeOne, update} = require('./db/queries/mongoose-queries');

var app = express();

const port = process.env.PORT || 9000;

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

app.delete('/removeAll',(req,res) => {

    removeAll(User,res);
    
});

app.delete('/removeOne',(req,res) => {

    removeOne(User,{firstName:"Amjad"},res);
    
});

app.delete('/remove/:userId',(req,res) => {

    var id = req.params.userId;

    removeById(User,id,res);
    
});

app.patch('/update/:userId',(req,res) => {

    var id = req.params.userId;

    //pick API of lodas is great to ensure that we update only specified properties.
    var body = _.pick(req.body,['firstName','middleName', 'lastName']); 
    update(User,id,res,body);
    
});

app.listen(port,() => {

    console.log(`Started on Port ${port}`);
});