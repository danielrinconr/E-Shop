const express = require('express');
const _ = require('underscore');
const app = express();

const Client = require('pg').Client;

app.get('/menus', function(req, res) {
    const client = new Client(process.env.URLDB);
    client.connect()
        .then(() => client.query("select * from shop.menus where activo = true"))
        .then(results => {
            res.json({
                ok: true,
                menus: results.rows
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
        .finally(() => client.end())
});

app.post('/menus', function(req, res) {
    const client = new Client(process.env.URLDB);
    let body = req.body;
    let menu = {
        nombre: body.nombre,
        mensaje: body.mensaje,
        id_menu_papa: body.id_menu_papa,
        id_usuario: body.id_usuario
    };
    const query = `SELECT shop.sp_201_insert(
        '${menu.nombre}',
        '${menu.mensaje}',
        ${menu.id_menu_papa},
        ${menu.id_usuario}
    )`;
    console.log(query);
    client.connect()
        .then(() => client.query(query))
        .then((ham) => {
            resp_ = ham.rows[0].sp_201_insert;
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