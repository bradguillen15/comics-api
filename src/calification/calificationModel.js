const Sequelize = require('sequelize');
const db = require('../../config/db');

const calificationModel = () => db.define('calificaciones', {
  idCalificacion: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  idPublicacion: Sequelize.INTEGER,
  idUsuario: Sequelize.INTEGER,
  rating: Sequelize.INTEGER,
}, { timestamps: false, freezeTableName: true });

module.exports = calificationModel();
