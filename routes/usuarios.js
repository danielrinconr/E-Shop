const express = require('express');
const _ = require('underscore');
const app = express();

const Client = require('pg').Client;

app.get('/usuarios', function(req, res) {
    const client = new Client(process.env.URLDB);
    client.connect()
        .then(() => client.query("select * from shop.usuarios where estado = 'A'"))
        .then(results => {
            res.json({
                ok: true,
                usuarios: results.rows
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
        .finally(() => client.end())
});

app.post('/usuarios', function(req, res) {
    const client = new Client(process.env.URLDB);
    let body = req.body;
    let us = {
        cedula: body.cedula,
        nombre: body.nombre,
        apellido: body.apellido,
        genero: body.genero,
        telefono: body.telefono,
        correo_electronico: body.correo_electronico,
        nombre_usuario: body.nombre_usuario,
        clave: body.clave,
        id_rol: body.id_rol,
        id_empresa: body.id_empresa,
        id_usuario: body.id_usuario
    };
    const query = `SELECT shop.sp_211_insert(
        ${us.cedula},
        '${us.nombre}',
        '${us.apellido}',
        '${us.genero}',
        ${us.telefono},
        '${us.correo_electronico}',
        '${us.nombre_usuario}',
        '${us.clave}',
        ${us.id_rol},
        ${us.id_empresa},
        ${us.id_usuario}
    )`;
    console.log(query);
    client.connect()
        .then(() => client.query(query))
        .then((ham) => {
            resp_ = ham.rows[0].sp_211_insert;
            ok_ = resp_[resp_.length - 2] === '1';
            msg_ = ok_ ? resp_ : "Consulte la table 'log_errores' para más información";
            console.log(ok_);
            res.json({
                ok: ok_,
                msg: msg_
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
        .finally(() => client.end())
});

app.put('/usuarios/:id', function(req, res) {
    const client = new Client(process.env.URLDB);
    // let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    let id = req.params.id;
    let body = req.body;
    let usuarios = {
        id: id,
        nombre: body.nombre
    };
    client.connect()
        .then(() => client.query(`UPDATE employees SET id=${id}, name='${usuarios.nombre}' WHERE id = ${id};`))
        .then(() => {
            res.json({
                ok: true,
                usuarios: us
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
        .finally(() => client.end())
});

app.delete('/usuarios/:id', function(req, res) {
    let id = req.params.id;
    // usuarios.findByIdAndRemove(id, (err, empresaBorrado) => {
    let cambiaEstado = {
        estado: false
    };
    usuarios.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, empresaBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!empresaBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuarios no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuarios: empresaBorrado
        });
    });
});
module.exports = app;