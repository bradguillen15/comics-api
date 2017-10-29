const Sequelize = require('sequelize');
const db = require('../../config/db');

const userModel = () => db.define('usuarios', {
  idUsuario: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  email: Sequelize.STRING,
  pass: Sequelize.STRING,
  nombre: Sequelize.STRING,
  imagenUrl: Sequelize.STRING,
  telefono: Sequelize.STRING,
  fechaCreacion: Sequelize.DATE
}, { timestamps: false, freezeTableName: true });

module.exports = userModel();
