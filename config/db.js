const Sequelize = require('sequelize');
const { database } = require('./credentials');

const DB = () =>
  new Sequelize(
    database.name,
    database.username,
    database.password,
    {
      host: database.hostname,
      port: database.port,
      dialect: 'mysql'
    }
  );

module.exports = DB();
