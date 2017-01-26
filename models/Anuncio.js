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
anuncioSchema.statics.list = function(cb) {
    Anuncio.find().exec(cb);
};

// Crear el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);