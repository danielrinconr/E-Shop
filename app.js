require('./config/config');
const express = require('express');
// const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const Client = require('pg').Client;

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

app.use(require('./routes/usuarios'));
app.use(require('./routes/empresa'));
app.use(require('./routes/menus'));
app.use(require('./routes/roles'));
app.use(require('./routes/permisos'));
app.use(require('./routes/usuarios'));

// process.env.PORT = 5432
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});

// const client = new Client(process.env.URLDB);
const client = new Client({
    connectionString: process.env.URLDB,
    ssl: process.env.NODE_ENV !== 'dev',
    // ssl: true
});

client.connect()
    .then(() => console.log('Connected successfuly'))
    .catch(err => console.log(err))
    .finally(() => client.end())