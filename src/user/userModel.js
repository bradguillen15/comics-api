const Sequelize = require('sequelize');
const db = require('../../config/db');

const User = db.define('User', {
  idUsuario: { type: Sequelize.INTEGER, primaryKey: true },
  email: Sequelize.STRING,
  pass: Sequelize.String,
  nombre: Sequelize.String,
  imagenUrl: Sequelize.String,
  telefono: Sequelize.String
});

module.exports = User;
