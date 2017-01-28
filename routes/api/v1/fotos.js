'use strict';

const express = require('express');
const router = express.Router();

// Recuperar fotos a través de la API
router.get('/', function (req, res, next) {

    // Recoger datos de querystring para aplicar filtros
    const nombreFoto = req.query.nombreFoto;

    res.json({sucess: true, data: 'http:3002/images/anuncios/nombreFoto'});

});

module.exports = router;
