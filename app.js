const express = require('express');
const bodyparser = require('body-parser');
const db = require('./config/db');

const server = () => {
  const routeList = Object.freeze([
    { uri: '/user', module: './src/user/userRouter' },
    { uri: '/comic', module: './src/comic/comicRouter' },
  ]);

  const app = express();
  app.use(bodyparser);

  // eslint-disable-next-line global-require,import/no-dynamic-require
  routeList.forEach(route => app.use(route.uri, require(route.module)));

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
