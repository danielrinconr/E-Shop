const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
// const empresa = require('../models/empresa');
const app = express();

const Client = require('pg').Client;

app.get('/', function(req, res) {
    res.json('Hello world');
});

app.get('/empresa', function(req, res) {
    const client = new Client(process.env.URLDB);
    client.connect()
        .then(() => client.query("select * from empresa WHERE estado = '1'"))
        .then(results => {
            res.json({
                ok: true,
                empresa: results.rows
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
        .finally(() => client.end())
});

app.post('/empresa', function(req, res) {
    const client = new Client(process.env.URLDB);
    let body = req.body;
    let emp = {
        id_empresa: body.id_empresa,
        nit: body.nit,
        nombre: body.nombre,
        logo: body.logo,
        direccion: body.direccion,
        pagina_web: body.pagina_web,
        faceboock: body.faceboock,
        instagram: body.instagram,
        twitter: body.twitter,
        codigo_color1: body.codigo_color1,
        codigo_color2: body.codigo_color2,
        id_ciudad: body.id_ciudad,
        estado: body.estado,
        fecha_creacion: body.fecha_creacion,
        activo: body.activo,
    };
    const query = `INSERT INTO empresa(nit,nombre,logo,direccion,pagina_web,faceboock,instagram,twitter,codigo_color1,codigo_color2,id_ciudad,estado,fecha_creacion,activo) VALUES (${emp.nit},'${emp.nombre}','${emp.logo}','${emp.direccion}','${emp.pagina_web}','${emp.faceboock}','${emp.instagram}','${emp.twitter}','${emp.codigo_color1}','${emp.codigo_color2}',${emp.id_ciudad},${emp.estado},'${emp.fecha_creacion}',${emp.activo})`;
    // const query = "INSERT INTO empresa(id_empresa,nit,nombre,logo,direccion,pagina_web,faceboock,instagram,twitter,codigo_color1,codigo_color2,id_ciudad,estado,fecha_creacion,activo) VALUES (2,0123456780,'hamana','hamana.png','cl.1#1-1','hamana.com','a','b','c','1','1',1,1,'19/07/19',1);"
    console.log(query);
    client.connect()
        .then(() => client.query(query))
        .then(() => {
            res.json({
                ok: true,
                empresa: us
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
        .finally(() => client.end())
});

app.put('/empresa/:id', function(req, res) {
    const client = new Client(process.env.URLDB);
    // let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    let id = req.params.id;
    let body = req.body;
    let empresa = {
        id: id,
        nombre: body.nombre
    };
    client.connect()
        .then(() => client.query(`UPDATE employees SET id=${id}, name='${empresa.nombre}' WHERE id = ${id};`))
        .then(() => {
            res.json({
                ok: true,
                empresa
            });
        })
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))
        .finally(() => client.end())
});

app.delete('/empresa/:id', function(req, res) {
    let id = req.params.id;
    // empresa.findByIdAndRemove(id, (err, empresaBorrado) => {
    let cambiaEstado = {
        estado: false
    };
    empresa.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, empresaBorrado) => {
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
                    message: 'empresa no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            empresa: empresaBorrado
        });
    });
});
module.exports = app;