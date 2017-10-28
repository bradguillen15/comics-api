const express = require('express');
const service = require('./userService');

const userRouter = () => {
  const router = express.Router();

  router.get('/', (req, res) =>
    service.getAll().then(comics => res.send(comics)));

  router.get('/:userId', (req, res) =>
    service.getById(req.params.userId).then(comics => res.send(comics)));

  router.post('/', (req, res) =>
    service.save(req.body.user).then(comics => res.send(comics)));

  return router;
};

module.exports = userRouter();
