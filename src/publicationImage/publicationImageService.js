const PublicationImage = require('./publicationImageModel');

const publicationService = () => {
  const getAll = () => PublicationImage.findAll()
    .then((publicationImages) => {
      if (!publicationImages) {
        throw new Error('Not Found');
      }
      return publicationImages;
    })
    .catch((err) => {
      throw Error(err);
    });

  const getLastPublicationImage = publicationId => getAll()
    .then(publicationImages => publicationImages
      .filter(pi => pi.idPublicacion === publicationId)
      .reduce(
        (lpi, pi) =>
          (lpi.fechaCreacion > pi.fechaCreacion ? lpi : pi),
        { fechaCreacion: new Date() }
      ))
    .catch((err) => {
      throw Error(err);
    });

  return {
    getAll,
    getLastPublicationImage
  };
};

module.exports = publicationService();

