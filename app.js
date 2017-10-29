const express = require('express');
const bodyParser = require('body-parser');
const { server } = require('./config/credentials');

const db = require('./config/db');

const app = () => {
  const expressApp = express();
  expressApp.use(bodyParser.urlencoded({ extended: true }));
  expressApp.use(bodyParser.json());

  // PublicationRoute
  expressApp.post('/getPublicaciones', (req, res) => {
    db(`SELECT publicaciones.idPublicacion, idUsuario, titulo, descripcion, precio, imagenesPublicaciones.urlImagen
        FROM publicaciones
        INNER JOIN imagenesPublicaciones ON (publicaciones.idPublicacion = imagenesPublicaciones.idPublicacion)
        WHERE estadoPublicacion = 1 
    `).then((data) => {
      res.send(data);
    });
  });

  expressApp.post('/getPublicacion/:idPublicacion', (req, res) => {
    db(`SELECT publicaciones.idPublicacion, publicaciones.idUsuario, titulo, descripcion, estadoComic, precio, fechaEdicion, estadoPublicacion, usuarios.nombre, imagenesPublicaciones.idImagenPublicacion , imagenesPublicaciones.urlImagen
        FROM publicaciones
        INNER JOIN usuarios ON (publicaciones.idUsuario = usuarios.idUsuario)
        INNER JOIN imagenesPublicaciones ON (publicaciones.idPublicacion = imagenesPublicaciones.idPublicacion)
        WHERE publicaciones.idPublicacion = ${req.params.idPublicacion} 
    `).then((data) => {
      res.send({
        idPublicacion: data[0].idPublicacion,
        idUsuario: data[0].idUsuario,
        titulo: data[0].titulo,
        descripcion: data[0].descripcion,
        precio: data[0].precio,
        fechaEdicion: data[0].fechaEdicion,
        nombre: data[0].nombre,
        imagenes: data.map(d =>
          ({ idImagenPublicacion: d.idImagenPublicacion, urlImagen: d.urlImagen })),
      });
    });
  });

  expressApp.get('/', (req, res) =>
    res.send('Api is running in port 3000'));

  return expressApp.listen(
    server.port,
    () => console.log('Connection has been established successfully.')
  );
};

module.exports = app();
