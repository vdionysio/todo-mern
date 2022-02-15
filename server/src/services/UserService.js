const User = require('../models/User');

const create = async (input) => {
  const newUser = new User(input);

  newUser.save();

  return true;
};

module.exports = {
  create,
};
