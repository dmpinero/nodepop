"use strict";

function internacionalizarError(req, error) {

    var lenguaje = req.body.lang || req.query.lang || req.get('Accept-Language');
    if (!lenguaje)
    {
        lenguaje = "es";
    }

    // Internacionalización
    var config = {
        //"lang": "es",
        "lang": lenguaje,
        "langFile": "../../config/locale.json" //relative path to index.js file of i18n-nodejs module
    }

    var i18n = require('i18n-nodejs')(config.lang, config.langFile);
    return i18n.__(error);
}

module.exports = internacionalizarError;


