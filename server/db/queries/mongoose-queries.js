const {mongoose} = require('mongoose');

const findQuery = (model) => {

    model.find(queryObj).then((docs)=>{

        return docs;

    },(err)=>{

        return err;
    });
};

const findOneQuery = (model,queryObj,res) => {

    model.findOne(queryObj).then((docs)=>{

        res.status(200).send(docs);

    },(err)=>{

        res.status(400).send();
    });

    
};

const findByIdQuery = (model,id) => {

    model.findOne(id).then((docs)=>{

        return docs;

    },(err)=>{

        return err;
    });

    
};

module.exports = {

    findQuery:findQuery,
    findOneQuery:findOneQuery,
    findByIdQuery:findByIdQuery
}


