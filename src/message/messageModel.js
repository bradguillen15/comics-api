const Sequelize = require('sequelize');
const db = require('../../config/db');

const publishedImageModel = () => db.define('mensajes', {
  idMensaje: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  contenido: Sequelize.STRING,
  idEmisor: Sequelize.INTEGER,
  idReceptor: Sequelize.INTEGER,
  estadoMensaje: Sequelize.INTEGER,
  fechaCreacion: Sequelize.DATE,
}, { timestamps: false, freezeTableName: true });

module.exports = publishedImageModel();
