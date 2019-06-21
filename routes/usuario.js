const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

const Client = require('pg').Client;
const ham = require('../config/config');
const client = new Client(ham);


app.get('/', function(req, res) {
    res.json('Hello world');
});

app.get('/usuario', function(req, res) {
    client.connect()
        .then(() => client.query('select * from employees'))
        .then(results => {
            res.json({
                ok: true,
                usuario: results.rows
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
});

app.post('/usuario', function(req, res) {
    let body = req.body;
    let usuario = {
        id: body.id,
        nombre: body.nombre
    };
    client.connect()
        .then(() => client.query(`INSERT INTO employees VALUES (${usuario.id}, '${usuario.nombre}')`))
        .then(results => {
            res.json({
                ok: true,
                usuario
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
});

app.put('/usuario/:id', function(req, res) {
    // let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    let body = req.body;
    client.connect()
        .then(() => client.query(`INSERT INTO employees VALUES (${usuario.id}, '${usuario.nombre}')`))
        .then(results => {
            res.json({
                ok: true,
                usuario: body
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    let cambiaEstado = {
        estado: false
    };
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});
module.exports = app;