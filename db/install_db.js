#!/usr/bin/env node

var client = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');

function insertarAnuncios(callBack) {
    client.connect('mongodb://localhost:27017/nodepop',
        function(err, db) {

            const anuncios = path.join('./db','anuncios.json');

            fs.readFile( anuncios, 'utf8', function (err, data) {
                if (err) {
                    callBack(err, 0);
                    return;
                }

                // JSON.parse es síncrono, por tanto para controlar si falla
                // puedo usar try/catch
                try {
                    const anunciosJson = JSON.parse(data);
                    console.log(anunciosJson);
                    db.anuncios.insert(anunciosJson);
                    //console.log(typeof(anunciosJson.anuncios));
                    /*anunciosJson.forEach(function(anuncio) {
                        console.log(anuncio);
                    });
                    */
                    callBack(null,anunciosJson.length);
                } catch (ex) {
                    callBack(ex, 0);
                    return;
                }
            });

            if (err) throw err;
            //db.collection('anuncios').insert(anuncios);
        });
}

insertarAnuncios(function(err, numeroAnuncios) {
    if (err) {
        console.log('Hubo un error:', err);
        return;
    }
    console.log('Número de anuncios insertados ', numeroAnuncios);
});