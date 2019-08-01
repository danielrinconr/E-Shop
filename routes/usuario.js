const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

const Client = require('pg').Client;

app.get('/usuario', function(req, res) {
    const client = new Client(process.env.URLDB);
    client.connect()
        .then(() => client.query("select * from shop.usuarios"))
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
        .finally(() => client.end())
});

app.post('/usuario', function(req, res) {
    const client = new Client(process.env.URLDB);
    let body = req.body;
    let us = {
        id: body.id,
        cedula: body.cedula,
        nombres: body.nombres,
        apellidos: body.apellidos,
        genero: body.genero,
        telefono_celular: body.telefono_celular,
        correo_electronico: body.correo_electronico,
        nombre_usuario: body.nombre_usuario,
        clave: body.clave,
        estado: body.estado,
        id_rol: body.id_rol
    };
    const query = `INSERT INTO usuarios(cedula, nombres, apellidos, genero, telefono_celular, correo_electronico, nombre_usuario, clave, estado, id_rol) VALUES (${us.cedula}, '${us.nombres}', '${us.apellidos}', ${us.genero}, ${us.telefono_celular}, '${us.correo_electronico}', '${us.nombre_usuario}', '${us.clave}', ${us.estado}, ${us.id_rol})`;
    // const query = "INSERT INTO usuarios	VALUES (3, 1, 'Pepito', 'Pérez', 1, 3, 'test2@gmail.com', 'test2', '1234', 1, 1);"
    console.log(query);
    client.connect()
        .then(() => client.query(query))
        .then(() => {
            res.json({
                ok: true,
                usuario: us
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
        .finally(() => client.end())
});

app.put('/usuario/:id', function(req, res) {
    const client = new Client(process.env.URLDB);
    // let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    let id = req.params.id;
    let body = req.body;
    let usuario = {
        id: id,
        nombre: body.nombre
    };
    client.connect()
        .then(() => client.query(`UPDATE employees SET id=${id}, name='${usuario.nombre}' WHERE id = ${id};`))
        .then(() => {
            res.json({
                ok: true,
                usuario
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
        .finally(() => client.end())
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