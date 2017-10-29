const Publication = require('./publicationModel');

const publicationService = () => {
  const getAll = () => Publication.findAll()
    .then((publications) => {
      if (!publications) {
        throw new Error('Not Found');
      }
      return publications;
    })
    .catch((err) => {
      throw Error(err);
    });

  const getById = (id) => {
    Publication.findById(id)
      .then((publication) => {
        if (!publication) {
          throw new Error('Not Found');
        }
        return publication;
      })
      .catch((err) => {
        throw Error(err);
      });
  };

  return {
    getAll,
    getById,
  };
};

module.exports = publicationService();

