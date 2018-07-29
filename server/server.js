const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');//
const {findOneQuery} = require('./db/queries/mongoose-queries');
const {findByIdQuery} = require('./db/queries/mongoose-queries');
const {removeAll, removeById, removeOne, update} = require('./db/queries/mongoose-queries');
const {addUser} = require('./services/addUser');
const {getMe} = require('./services/getMe');
const {login} = require('./services/login');
const {logout} = require('./services/logout');

const {authenticate} = require("./middleware/authenticate");

var app = express();

const port = process.env.PORT || 9000;

app.use(bodyParser.json());

app.post('/users',(req,res) => {

    addUser(req,res);
});

app.get('/users',(req,res) => {

    User.find().then((docs)=>{

        res.send({users:docs});

    },(err)=>{

        res.status(400).send();
    });
    
});

app.get('/users/me',authenticate, (req,res) => {

    getMe(req,res);
});

app.post('/users/login', (req,res) => {

    login(req,res);
});

app.delete('/users/me/token', authenticate, (req,res) => {

    logout(req,res);
});

//===================

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