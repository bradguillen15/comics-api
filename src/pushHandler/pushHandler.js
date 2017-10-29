const Sequelize = require('sequelize');
const db = require('../../config/db');

const pushHandlerModel = () => db.define('pushHandler', {
  idPushHandler: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  idUsuario: Sequelize.INTEGER,
  so: Sequelize.STRING,
  pushKey: Sequelize.STRING,
  deviceID: Sequelize.STRING,
  login: Sequelize.DATE,
  logout: Sequelize.DATE,
}, { timestamps: false, freezeTableName: true });

module.exports = pushHandlerModel();
