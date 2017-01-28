"use strict";

module.exports = {
  dbURI: 'mongodb://localhost:27017/nodepop',
  jwt: {
      secret: 'pruebaClave',
      expiresIn: '2d'
  },
  errores: {

      TOKEN_NOT_FOUND: "Token no proporcionado",
      INVALID_TOKEN: "Token no válido",
      NOT_FOUND: "No encontrado",
      USER_NOT_FOUND: 'No encontrado',
      INVALID_USERNAME: 'Nombre de usuario no válido',
      INVALID_PASSWORD: 'Contraseña no válida'
  },
  tags: ['work', 'lifestyle', 'motor', 'mobile'],
};