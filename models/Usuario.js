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

// ponemos un método al schema
usuarioSchema.statics.listUser = function(filter, cb) {
    const query = Usuario.find(filter);
    query.exec(cb); // Hay que poner exec para que ejecuta la consulta sobre el objeto query que es lo que devuelve find
};


// Crear el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);