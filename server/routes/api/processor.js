const express       = require('express');
const readXlsxFile  = require('read-excel-file/node');
const mongodb       = require('mongodb');
const db            = require('../../db')

const router        = express.Router();

router.get('/', async(req, res) =>{
    const cpu = await loadMotherBoardsCollection();
    res.send(await cpu.find({}).toArray());
});

router.put('/', async(req, res) => {
    const cpu = await loadMotherBoardsCollection();
    await cpu.insertOne({
        ...req.body,
        createdAt: new Date()        
    });
    res.status(201).send();
});

router.put('/load', async(req, res) => {
    const cpu = await loadMotherBoardsCollection();
    var processorsItems = await loadItems();
    await cpu.insertMany(processorsItems);
    // console.log(processorsItems);
    res.status(201).send();
});


router.post('/:id', async(req, res) => {    
    const cpu = await loadMotherBoardsCollection();
    await cpu.updateOne({
        _id: new mongodb.ObjectID(req.params.id)
    },{
        $set : req.body
    })
    res.status(201).send();
});




router.delete('/:id', async(req, res) =>{
    // req.params.id
    const cpu = await loadMotherBoardsCollection();
    await cpu.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    })
    res.status(200).send();
});

async function loadMotherBoardsCollection(){    
    return db.get().collection('processors');
}
async function loadItems() {
    let items = await readXlsxFile('server/static/CPU.xlsx');
    return items.map(cpu =>{
        return {
            "name": cpu[0],
            "serie": cpu[1],
            "brand": cpu[2],
            "socketsSupported": cpu[3],
            "threads": cpu[4],
            "cores": cpu[5],
            "baseClock": cpu[6],
            "cpuFrequency": cpu[7],
            "year": cpu[8],
            "generation": cpu[9],
            "watts": cpu[10],
            "cacheSize": cpu[11],
            "numberMemoryChannels": cpu[12],
            "memoryType": cpu[13],
            "maxMemorySize": cpu[14],
            "maxNumberMemoryChannels": cpu[15],
            "maxMemoryBandWidth": cpu[16],
            "link": cpu[17]
        }
    });
}


module.exports = router;