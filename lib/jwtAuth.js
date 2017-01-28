"use strict";

const jwt = require("jsonwebtoken");
const localConfig = require('../config/localConfig');
const mensajesError = require('../i18n/i18nError');

// Middleware de autenticación
module.exports = function () {
    return function (req, res, next) {
        // Busca el token en el body, en la request o en la cabecera
        const token = req.body.token || req.query.token || req.get('x-access-token');

        if (!token) {
            return next(new Error(mensajesError(req, localConfig.errores.TOKEN_NOT_FOUND)));
        }

        // Hay que pasar la clave secreta para poder verificar el token
        jwt.verify(token, localConfig.jwt.secret, function (err, decoded) {
            if (err) {
                return next(new Error(mensajesError(req, localConfig.errores.INVALID_TOKEN))); // Token no válido (caducado o modificado por el usuario)
            }

            req.decoded = decoded; // Guardamos el token decodificado en la request
            next();
        });

    }
};