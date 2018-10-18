const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var db = require('./db')
const config  = require('./config/config');

const connString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

const app = express();

app.use(bodyParser.json());
app.use(cors());


const mob   = require('./routes/api/motherBoard');
const cpu   = require('./routes/api/processor');
const cases = require('./routes/api/case');
const ram   = require('./routes/api/ram');
const gpu   = require('./routes/api/graphicUnit');
const sto   = require('./routes/api/storage');



app.use('/api/motherboard', mob);
app.use('/api/processor', cpu);
app.use('/api/case', cases);
app.use('/api/ram', ram);
app.use('/api/graphic', gpu);
app.use('/api/storage', sto);




app.get('/', (req, res) => {
    res.send('Hello world es');
});

// Handle production
if(process.env.NODE_ENV === 'production'){
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => {
            res.sendFile(__dirname, + '/public/index.html')
    });
}

const port = process.env.PORT  || 3000;

try {
    db.connect(connString).then(res => {
        console.log('res =>', res)
        if(!res.hasError) app.listen(port, ()=> console.log('Listening at port 3000'));

    });
    
} catch (error) {
    console.log('No se pudo conectar a mongo')    
}
