const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
var db = require('../../db')



router.get('/', async(req, res) =>{
    const gpu = await loadMotherBoardsCollection();
    res.send(await gpu.find({}).toArray());
});


router.put('/', async(req, res) => {
    const gpu = await loadMotherBoardsCollection();
    await gpu.insertOne({
        ...req.body,
        createdAt: new Date()        
    });
    res.status(201).send();
});


router.post('/:id', async(req, res) => {    
    const gpu = await loadMotherBoardsCollection();
    await gpu.updateOne({
        _id: new mongodb.ObjectID(req.params.id)
    },{
        $set : req.body
    })
    res.status(201).send();
});


router.delete('/:id', async(req, res) =>{
    // req.params.id
    const gpu = await loadMotherBoardsCollection();
    await gpu.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    })
    res.status(200).send();
});

async function loadMotherBoardsCollection(){    
    return db.get().collection('gpu');
}


module.exports = router;