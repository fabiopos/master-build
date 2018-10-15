const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

const connString = 'mongodb://localhost:27017/master-build';

// GET USERS
router.get('/', async(req, res) =>{
    const mob = await loadMotherBoardsCollection();
    res.send(await mob.find({}).toArray());
});

// CREATE USER
router.put('/', async(req, res) => {
    const mob = await loadMotherBoardsCollection();
    await mob.insertOne({
        ...req.body,
        createdAt: new Date()        
    });
    res.status(201).send();
});


// UPDATE USER
router.post('/:id', async(req, res) => {    
    const mob = await loadMotherBoardsCollection();
    await mob.updateOne({
        _id: new mongodb.ObjectID(req.params.id)
    },{
        $set : req.body
    })
    res.status(201).send();
});

// DELETE USER
router.delete('/:id', async(req, res) =>{
    // req.params.id
    const mob = await loadMotherBoardsCollection();
    await mob.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    })
    res.status(200).send();
});

async function loadMotherBoardsCollection(){
    const client = await mongodb.MongoClient.connect(connString, {  useNewUrlParser: true  });
    return client.db('master-build').collection('motherBoards');
}


module.exports = router;