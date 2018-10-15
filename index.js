const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(cors());

// usuarios
const users = require('./routes/api/motherBoard');

app.use('/api/motherBoard', users);

app.get('/', (req, res) => {
    res.send('Hello world es');
});

const port = process.env.PORT  || 3000;

app.listen(port, ()=> console.log('Listening at port 3000'));