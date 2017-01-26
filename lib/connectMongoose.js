"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', function(err) {
    console.log('Error de conexión:', err);
    process.exit(1);
});

conn.once('open', function() {
    console.log('Conectado a mongodb.');
});

mongoose.connect('mongodb://localhost:27017/nodepop');
