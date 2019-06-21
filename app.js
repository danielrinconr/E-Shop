const ham = require('./config/config');
const express = require('express');
// const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const Client = require('pg').Client;

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

app.use(require('./routes/usuario'));

app.listen(process.env.PORT, () => { console.log('Escuchando puerto: ', process.env.PORT); });

const client = new Client(ham);

client.connect()
    .then(() => console.log('Connected successfuly'))
    .catch(err => console.log(err))
    .finally(() => client.end())