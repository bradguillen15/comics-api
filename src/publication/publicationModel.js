const Sequelize = require('sequelize');
const db = require('../../config/db');

const publicationModel = () => db.define('publicaciones', {
  idPublicacion: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  idUsuario: Sequelize.INTEGER,
  titulo: Sequelize.STRING,
  descripcion: Sequelize.STRING,
  estadoComic: Sequelize.STRING,
  precio: Sequelize.STRING,
  fechaEdicion: Sequelize.STRING,
  estadoPublicacion: Sequelize.STRING,
}, { timestamps: false, freezeTableName: true });

module.exports = publicationModel();
