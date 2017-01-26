"use strict";

const mongoose = require('mongoose');

// Crear esquema
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

// ponemos un método al schema
usuarioSchema.statics.list = function(cb) {
    Usuario.find().exec(cb);
};

// Crear el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);