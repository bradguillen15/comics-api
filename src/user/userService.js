const User = require('./userModel');

const userService = () => ({
  getAll: () => {
    User.findAll().then(comics => comics);
  },
  getById: (id) => {
    User.findById(id).then(comics => comics);
  },
  save: (userToSave) => {
    User.save(userToSave).then(savedUser => savedUser);
  }
});

module.exports = userService();
