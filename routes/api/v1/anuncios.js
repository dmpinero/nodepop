'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');
const router = express.Router();
const jwtAuth = require('../../../lib/jwtAuth');
router.use(jwtAuth());

// Recuperar anuncios a través de la API
router.get('/', function (req, res, next) {

    // Recoger datos de querystring para aplicar filtros
    const tags = req.query.tags;
    const venta = req.query.venta;
    var precio = req.query.precio;
    const nombre = req.query.nombre;

    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const start = parseInt(req.query.start);

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

    if (precio) {
        if (precio.substring(0, 1) === '-') // Precio comienza por -
        {
            //console.log('El precio comienza en -');
            precio = precio.substring(1);
            //console.log('El nuevo precio es', precio);

            filter.precio = { '$lt': precio }; // Precio menor que
        }
        else if (precio.substring(precio.length-1, precio.length) === '-') { // Precio acaba en -
            //console.log('El precio acaba en -');

            precio = precio.substring(0,precio.length-1);
            filter.precio = { '$gt': precio};
        }
        else if (precio.includes('-')) // Rango de precios
        {
            var precioInicio = precio.substring(0, precio.indexOf('-'));
            var precioFin = precio.substring(precio.indexOf('-') + 1, precio.length);
            //console.log('El precio contiene un -');
            //console.log('El precio de inicio es', precioInicio);
            //console.log('El precio de inicio es', precioFin);

            filter.precio = { '$gt': precioInicio, '$lt': precioFin };
        }
        else { // Precio exacto
            console.log('Precio exacto');

            filter.precio = precio;
        }
    }

    // Sólo metemos el nombre en el filtro si viene informado
    if (nombre) { // Nombre comienza por la expresión buscada
        filter.nombre = new RegExp('^' + nombre, 'i');
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
router.post('/', function (req, res, next) {

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
router.delete('/:id', function (req, res, next) {

    const id = req.params.id;
    Anuncio.remove({_id: id}, function (err) {
        if (err) {
            return next(err);
        }
        res.json({success: true});
    });
});

// Borrar todos los anuncios a través de la API
router.delete('/', function (req, res, next) {

    Anuncio.remove({}, function (err) {
        if (err) {
            return next(err);
        }
        res.json({success: true});
    });
});

// Obtener lista de tags
router.get('/tags', function (req, res, next) {

    const tags = req.query.tags;

    // Filtros. Originalmente está vacío
    const filter = {};

    // Sólo metemos el nombre en el filtro si viene informado
    if (tags) {
        filter.tags = tags;
    }

    Anuncio.list(filter, null, null, function (err, tags) {
        if (err) {
            res.json({sucess: false, error: err});
            return;
        }
        res.json({sucess: true, data: tags});
    });
});

module.exports = router;
