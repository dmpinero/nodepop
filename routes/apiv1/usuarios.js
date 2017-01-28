"use strict";

const express = require('express');
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const router = express.Router();

var passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const localConfig = require('../../config/localConfig');
const jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth());

const mensajesError = require('../../i18n/i18nError');

// Recuperar usuarios a través de la API
router.get('/', function(req, res, next) {

    Usuario.list(function (err, usuarios) {
        if (err) {
            res.json({sucess: false, error: err});
            return;
        }
        return res.json({sucess: true, data: usuarios})
    });
});

// Guardar un usuario a través de la API
router.post('/', function(req, res, next) {

    // Crear objeto usuario
    var usuario = new Usuario(
    {
        nombre: req.body.nombre,
        email: req.body.email,
        clave: passwordHash.generate(req.body.clave)
    });

    //next(new Error('Error provocado'));

    usuario.save(function (err, usuarioCreado) {
        if (err) {
            res.json({sucess: false, error: err});
            return;
        }
        return res.json({sucess: true, data: usuarioCreado});
    });

});

// Borrar un usuario a través de la API
router.delete('/:id', function(req, res, next) {

    const id = req.params.id;
    Usuario.remove({_id: id}, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({success: true});
    })
});

// Borrar todos los usuarios a través de la API
router.delete('/', function(req, res, next) {

    Usuario.remove({}, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({success: true});
    })
});

// Autenticación de usuarios
router.post('/authenticate', function(req, res) {
    const userName = req.body.username;
    const password = req.body.password;

    // Filtros. Originalmente está vacío
    const filter = {};

    // Sólo metemos el nombre en el filtro si viene informado
    filter.nombre = userName;

    const usuario = Usuario.listUser(filter, function (err, usuario) {
        if (err) {
            return next(err);
        }
        if (usuario.length === 0)
        {
            return res.json({success: false, error:mensajesError(req, 'Nombre de usuario no válido')});
        }

        var clavesIguales = passwordHash.verify(password, usuario[0].clave);

        if (! clavesIguales) {
            return res.json({success: false, error:mensajesError(req, 'Contraseña no válida')});
        }
        const token = jwt.sign({_id: usuario[0]._id}, localConfig.jwt.secret, {
            expiresIn: localConfig.jwt.expiresIn
        });

        return res.json({success: true, data:usuario, token: token});
    });
});

module.exports = router;
