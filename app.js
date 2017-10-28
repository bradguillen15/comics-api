const express = require('express');

const server = () => {
  const routeList = Object.freeze([
    // eslint-disable-next-line global-require
    { uri: '/comic', module: require('./src/comic/comicRouter') },
  ]);

  const app = express();

  routeList.forEach(route => app.use(route.uri, route.module));

  return app.listen(
    3000,
    () => console.log('Comics app listening on port 3000!'),
  );
};

module.exports = server();
