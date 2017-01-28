'use strict';

const express = require('express');
const router = express.Router();
const jwtAuth = require('../../../lib/jwtAuth');
const tags = require('../../../config/localConfig').tags;
router.use(jwtAuth());

// Obtener lista de tags
router.get('/', function (req, res, next) {

    return res.json({sucess: true, data: tags});
});

module.exports = router;
