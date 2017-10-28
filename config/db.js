const Sequelize = require('sequelize');
const { database } = require('./credentials');

const DB = () =>
  new Sequelize(
    database.url,
    database.username,
    database.password,
    {
      url: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    },
  );

module.exports = new DB();
