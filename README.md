# Nodepop API
Práctica del módulo MEAN de Keepcoding I Web Development Master Bootcamp

![Matrix_Kung_Fu](http://media.giphy.com/media/vEcyRJ5yysqk/giphy.gif)

## Instrucciones

Requisitos de instalación:

- Node >= 6.9.1 
- Puedes ver la versión de Node instalada a través del terminal, con el comando _node -v_
- MongoDB
- Git

### Instrucciones de instalación

	$ git clone https://github.com/dmpinero/nodepop
	$ cd nodepop
	$ npm install
	
### Creación de base de datos e inicialización con juego de datos
	$ npm run installDB
	
### Arrancar aplicación
	$ npm start
	
	La aplicación está configurara para arrancar en el puerto 3002. Si se desea utilizar otro puerto, puede configurrarse en el archivo _package.json_
	
## Servicios proporcionados por la API

- **Registro** (nombre, email, contraseña)

    _http://localhost:3002/api/v1/usuarios_

- **Autenticación** (email, contraseña)

    _http://localhost:3002/api/v1/usuarios/authenticate_

- **Lista de anuncios** (paginada, con filtros de búsqueda)

    _http://localhost:3002/api/v1/anuncios_ (Devuelve todos los anuncios)
    _http://localhost:3002/api/v1/anuncios?tag=mobile&venta=true&nombre=iphone&limit=2&sort=precio&precio=-150 (Ejemplo de filtro)_
    

- **Lista de tags existentes** (categorías de anuncios)

    _localhost:3002/api/v1/tags_

- **En todos los servicios debe pasarle el token, bien por GET, POST o en la cabecera de la petición**

- **La visualización de errores por defecto es en Español, para visualizar los errores en inglés puede utilizarse el parámetro lang=en en las peticiones (GET o POST)**

## Visualización de fotos

- http://localhost:3002/images/anuncios/bici.jpg
- http://localhost:3002/images/anuncios/iphone.jpg

## Autor

&copy; 2017 Daniel Martínez Piñero.