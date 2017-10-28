const Sequelize = require('sequelize');
const { database } = require('./credentials');

const DB = () =>
  new Sequelize(
    database.name,
    database.username,
    database.password,
    {
      host: `${database.host}:${database.port}/${database.name}`,
      dialect: 'mysql'
    }
  );

module.exports = DB();
