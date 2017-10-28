const Comic = require('./comicModel');

const comicService = () => ({
  getAll: () => {
    Comic.findAll().then(comics => comics);
  },
});

module.exports = comicService();
