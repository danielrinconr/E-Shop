const express = require('express');
const _ = require('underscore');
const app = express();

const Client = require('pg').Client;

app.get('/permisos', function(req, res) {
    const client = new Client(process.env.URLDB);
    client.connect()
        .then(() => client.query("select * from shop.permisos where activo = true"))
        .then(results => {
            res.json({
                ok: true,
                permisos: results.rows
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
        .finally(() => client.end())
});

app.post('/permisos', function(req, res) {
    const client = new Client(process.env.URLDB);
    let body = req.body;
    let permiso = {
        id_rol: body.id_rol,
        id_menu: body.id_menu,
        id_usuario: body.id_usuario
    };
    const query = `SELECT shop.sp_203_insert(
        ${permiso.id_rol},
        ${permiso.id_menu},
        ${permiso.id_usuario}
    )`;
    console.log(query);
    client.connect()
        .then(() => client.query(query))
        .then((ham) => {
            resp_ = ham.rows[0].sp_203_insert;
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

module.exports = app;