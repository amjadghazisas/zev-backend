const {mongoose} = require('mongoose');
const {ObjectID} = require ('mongodb');

const findQuery = (model,res) => {

    model.find(queryObj).then((docs)=>{

        res.status(200).send(docs);

    },(err)=>{

        res.status(400).send();
    });
};

const findOneQuery = (model,queryObj,res) => {

    model.findOne(queryObj).then((docs)=>{

        res.status(200).send(docs);

    },(err)=>{

        res.status(400).send();
    });

    
};

const findByIdQuery = (model,id,res) => {

    if(!ObjectID.isValid(id)){

        console.log("Id is not valid");
        return res.status(400).send();
    }
    
    model.findById(id).then((docs)=>{

        //id did not match any record, no error will be thrown and hence handling
        if(!docs){
             console.log("Id not found");
             return res.status(404).send();
        }

        res.status(200).send({docs});

    }).catch((e) => {
        console.log(e);
    });

    
};

module.exports = {

    findQuery:findQuery,
    findOneQuery:findOneQuery,
    findByIdQuery:findByIdQuery
}


