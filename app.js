const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const { server } = require('./config/credentials');

const publicationService = require('./src/publication/publicationService');
const publicationImageService = require('./src/publicationImage/publicationImageService');
const userService = require('./src/user/userService');

const app = () => {
  const expressApp = express();
  expressApp.use(bodyParser.urlencoded({ extended: true }));
  expressApp.use(bodyParser.json());

  // PublicationRoute
  expressApp.post('/getPublicaciones', (req, res) =>
    publicationService.getAll()
      .then((publications) => {
        if (!publications) {
          res.send().state(404);
        }
        return publications
          .filter(publication => publication.estadoComic !== req.body.estadoPublicacion)
          .map(p => publicationImageService.getLastPublicationImage(p.idPublicacion)
            .then(publicationImage => res.json({
              idPublicacion: p.idPublicacion,
              idUsuario: p.idUsuario,
              titulo: p.titulo,
              descripcion: (!p.description) ? '' : p.descripcion.slice(150),
              precio: p.precio,
              urlImagen: publicationImage.urlImagen
            })));
      })
      .catch(err => res.send(err).state(500)));

  expressApp.post('/getPublicacion/:idPublicacion', (req, res) =>
    publicationService.getById(req.params.idPublicacion)
      .then((publication) => {
        if (!publication) {
          res.send().state(404);
        }
        return userService.getById(publication.idUsuario)
          .then(user => ({
            idPublicacion: publication.idPublicacion,
            idUsuario: publication.idUsuario,
            nombreUsuario: user.nombre,
            titulo: publication.titulo,
            descripcion: publication.descripcion,
            estadoComic: publication.estadoComic,
            fechaEdicion: publication.fechaEdicion,
            estadoPublicacion: publication.estadoPublicacion,
          }));
      })
      .catch(err => res.send(err).state(500)));

  expressApp.get('/', (req, res) =>
    res.send('Api is running in port 3000'));

  return expressApp.listen(
    server.port,
    () => db.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      })
  );
};

module.exports = app();
