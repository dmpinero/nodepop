"use strict";

const express = require('express');
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');
const router = express.Router();

// Recuperar anuncios a través de la API
router.get('/', function(req, res, next) {

    // Recoger datos de querystring para aplicar filtros
    const tags = req.query.tags;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const nombre = req.query.nombre;

    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;

    // Filtros. Originalmente está vacío
    const filter = {};

    // Sólo metemos el nombre en el filtro si viene informado
    if (tags) {
        filter.tags = tags;
    }

    // Sólo metemos el nombre en el filtro si viene informado
    if (venta) {
        filter.venta = venta;
    }

    // Sólo metemos el nombre en el filtro si viene informado
    if (nombre) { // Nombre comienza por la expresión buscada
        filter.nombre = new RegExp('^' + nombre, "i");
    }

    Anuncio.list(filter, limit, sort, function (err, anuncios) {
        if (err) {
            res.json({sucess: false, error: err});
            return;
        }
        res.json({sucess: true, data: anuncios});
    });
});

// Guardar un anuncio a través de la API
router.post('/', function(req, res, next) {

    // Crear objeto anuncio
    var anuncio = new Anuncio(
    {
        nombre: req.body.nombre,
        venta: req.body.venta,
        precio: req.body.precio,
        foto: req.body.foto,
        tags: req.body.tags
    });

    anuncio.save(function (err, anuncioCreado) {
        if (err) {
            res.json({sucess: false, error: err});
            return;
        }
        res.json({sucess: true, data: anuncioCreado});
    });

});

// Borrar un anuncio a través de la API
router.delete('/:id', function(req, res, next) {

    const id = req.params.id;
    Anuncio.remove({_id: id}, function(err) {
        if (err) {
            return next(err);
        }
        res.json({success: true});
    })
});

// Borrar todos los anuncios a través de la API
router.delete('/', function(req, res, next) {

    Anuncio.remove({}, function(err) {
        if (err) {
            return next(err);
        }
        res.json({success: true});
    })
});

module.exports = router;
