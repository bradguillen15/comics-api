const express = require('express');
const db = require('./config/db');

const server = () => {
  const routeList = Object.freeze([
    // eslint-disable-next-line global-require
    { uri: '/comic', module: require('./src/comic/comicRouter') },
  ]);

  const app = express();

  routeList.forEach(route => app.use(route.uri, route.module));

  return app.listen(
    3000,
    () => db.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      })
  );
};

module.exports = server();
