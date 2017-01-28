"use strict";

const mongoose = require('mongoose');

// Crear esquema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta:Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// ponemos un método al schema
anuncioSchema.statics.list = function(filter, limit, sort, cb) {
    const query = Anuncio.find(filter);
    query.limit(limit);
    query.sort(sort); // Criterio de ordenación
    query.exec(cb); // Hay que poner exec para que ejecuta la consulta sobre el objeto query que es lo que devuelve find
};

// Crear el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);