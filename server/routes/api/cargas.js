const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
var db = require('../../db');

router.get('/', async(req, res) =>{
    const cases = await loadCollection();
    res.send(await cases.find({}).toArray());
});


router.put('/:id', async(req, res) => {
    const cases = await loadCollection();
    await cases.insertOne({
        ...req.body,
        createdAt: new Date()        
    });
    res.status(201).send();
});







async function loadCollection(id){    
    return db.get().collection(id);
}


module.exports = router;