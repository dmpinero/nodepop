#!/usr/bin/env node

// Conexión a la base de datos
require('../lib/connectMongoose')
const mongoose = require('mongoose');
const conn = mongoose.connection;

// Ficheros
const fs = require('fs');
const path = require('path');
const ficheroAnuncios = path.join('config', 'anuncios.json');

// Modelos
require('../models/Anuncio');
require('../models/Usuario');

// Entidades
const Anuncio = mongoose.model('Anuncio');
const Usuario = mongoose.model('Usuario');

var passwordHash = require('password-hash');
const async = require('async');

async.series([

    function (callback) {
        Anuncio.remove({}, function (err) {
            console.log('Borrando tabla Anuncios');
            if (err) {
                console.error('Error borrando tabla Anuncios: ', err);
                return callback(err);
            }
            callback(null, 'BajaAnuncios');
        });
    },

    function (callback) {
        Usuario.remove({}, function (err) {
            console.log('Borrando tabla Usuarios');
            if (err) {
                console.error('Error borrando tabla Usuarios ', err);
                return callback(err);
            }
            callback(null, 'BajaUsuarios');
        });
    },

    function (callback) {
        fs.readFile(ficheroAnuncios, {encoding: 'utf8'}, function (err, data) {
            if (err) {
                console.log('Error al leer fichero de anuncios');
                return callback(err);
            }
            try {
                data = JSON.parse(data);
                //console.log('data:', data);
            } catch (e) {
                return callback(e);
            }
            async.each(data.anuncios, (function (item) {
                new Anuncio(item).save(function (err, nuevoAnuncio) {
                    if (err) {
                        console.log('Error al crear anuncio', err);
                        return callback(err);
                    }
                    console.log('Anuncio ' + nuevoAnuncio.nombre + ' creado');
                });
            }));
            callback(null, 'AltaAnuncios');
        });
    },

    function (callback) {

        // Crear objeto usuario
        var usuario = new Usuario(
        {
            nombre: 'dani',
            email: 'dmpinero@gmail',
            clave: passwordHash.generate('dani')
        });

        new Usuario(usuario).save(function (err, nuevoUsuario) {
            if (err) {
                console.log('Error al crear usuario', err);
                return callback(err);
            }
            console.log('Usuario ' + nuevoUsuario.nombre + ' creado');
            callback(null, 'altaUsuario');
        });
    }
    ], function (err, results) {
        if (err) {
            console.error('Error instalando base de datos: ', err);
            return;
        }
        console.log(results);
        conn.close();

        console.log('');
        console.log('Instalacion con éxito de los datos Nodepop!!');
    }
);
