const Sequelize = require('sequelize');
const { database } = require('./credentials');

const DB = () =>
  new Sequelize(
    `${database.host}:${database.port}/${database.name}`,
    database.username,
    database.password
  );

module.exports = new DB();
