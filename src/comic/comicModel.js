const Sequelize = require('sequelize');
const db = require('../comic/comicModel');

const Comic = db.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = Comic;
