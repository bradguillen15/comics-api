const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const { server } = require('./config/credentials');

const app = () => {
  const expressApp = express();
  expressApp.use(bodyParser.urlencoded({ extended: true }));
  expressApp.use(bodyParser.json());

  // eslint-disable-next-line global-require,import/no-dynamic-require
  server.routes.forEach(route => expressApp.use(route.uri, require(route.module)));

  expressApp.get('/', (req, res) =>
    res.send('Api is running in port 3000'));

  return expressApp.listen(
    server.port,
    () => db.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      })
  );
};

module.exports = app();
