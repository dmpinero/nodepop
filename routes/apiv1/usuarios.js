"use strict";

const express = require('express');
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const router = express.Router();

function encriptar(user, pass) {
    var crypto = require('crypto')
    // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
    var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
    return hmac
}

// Recuperar usuarios a través de la API
router.get('/', function(req, res, next) {

    Usuario.list(function (err, usuarios) {
        if (err) {
            res.json({sucess: false, error: err});
            return;
        }
        res.json({sucess: true, data: usuarios})
    });
});

// Guardar un usuario a través de la API
router.post('/', function(req, res, next) {

    // Crear objeto usuario
    var usuario = new Usuario(
    {
        nombre: req.body.nombre,
        email: req.body.email,
        clave: encriptar(req.body.nombre, req.body.clave)
    });

    //next(new Error('Error provocado'));

    usuario.save(function (err, usuarioCreado) {
        if (err) {
            res.json({sucess: false, error: err});
            return;
        }
        res.send({sucess: true, data: usuarioCreado});
    });

});

// Borrar un usuario a través de la API
router.delete('/:id', function(req, res, next) {

    const id = req.params.id;
    Usuario.remove({_id: id}, function(err) {
        if (err) {
            return next(err);
        }
        res.json({success: true});
    })
});

// Borrar todos los usuarios a través de la API
router.delete('/', function(req, res, next) {

    Usuario.remove({}, function(err) {
        if (err) {
            return next(err);
        }
        res.json({success: true});
    })
});

module.exports = router;
