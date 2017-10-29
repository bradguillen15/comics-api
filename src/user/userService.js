const User = require('./userModel');

const userService = () => {
  const getAll = () => User.findAll().then(comics => comics);

  const getById = id => User.findById(id).then(comics => comics);

  const upsert = (id, userDto) => User.findById(id).then((user) => {
    if (user) {
      return user.update(userDto).then(updatedUser => updatedUser);
    }
    return User.create(userDto).then(createdUser => createdUser);
  });

  return {
    getAll,
    getById,
    upsert
  };
};

module.exports = userService();

