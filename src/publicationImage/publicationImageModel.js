const Sequelize = require('sequelize');
const db = require('../../config/db');

const publicationImageModel = () => db.define('imagenesPublicaciones', {
  idImagenPublicacion: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  idPublicacion: Sequelize.INTEGER,
  urlImagen: Sequelize.STRING,
  fechaCreacion: Sequelize.DATE,
}, { timestamps: false, freezeTableName: true });

module.exports = publicationImageModel();
