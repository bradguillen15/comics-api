const express = require('express');
const comicService = require('./comicService');

const comicRouter = () => {
  const router = express.Router();

  router.get('/', (req, res) =>
    comicService.getAll().then(comics => res.send(comics)));

  return router;
};

module.exports = comicRouter();
