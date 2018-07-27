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

const removeAll = (model,res) => {

    model.remove({}).then((result)=>{

        console.log("User(s) removed");
        res.status(200).send();

    },(err)=>{

        console.log("Failed to remove user(s)");
        res.status(400).send();
    });

    
};

const removeOne = (model,queryObj,res) => {

    model.findOneAndRemove(queryObj).then((doc)=>{

        if(!doc){

            res.status(400).send();
        }

        console.log("User(s) removed");

        res.status(200).send();

    },(err)=>{

        console.log("Failed to remove user(s)");
        res.status(400).send();
    });    
};

const removeById = (model,id,res) => {

    if(!ObjectID.isValid(id)){

        console.log("Id is not valid");
        return res.status(400).send();
    }

    model.findByIdAndRemove(id).then((doc)=>{

        if(!doc){

            res.status(400).send();
        }

        console.log("User removed");
        res.status(200).send();

    },(err)=>{

        console.log("Failed to remove use");
        res.status(400).send();
    });    
};

const update = (model,id,res,body) => {

    

    if(!ObjectID.isValid(id)){

        console.log("Id is not valid");
        return res.status(400).send();
    }

    model.findByIdAndUpdate(id,{$set:body},{new:true}).then((doc)=>{

        if(!doc){

            res.status(404).send();
        }

        res.status(200).send({doc});

    }).catch((e) => {

        res.status(400).send();
    });    
};

module.exports = {

    findQuery:findQuery,
    findOneQuery:findOneQuery,
    findByIdQuery:findByIdQuery,
    removeAll:removeAll,
    removeOne:removeOne,
    update:update

}


