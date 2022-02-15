const User = require('../models/User');
const UserSchema = require('../schemas/userSchema');
const { validateError } = require('../helpers');

const create = async (input) => {
  const { error } = UserSchema.validate(input);

  if (error) throw validateError(999, error.message);

  const newUser = new User(input);

  try {
    await newUser.save();
  } catch (err) {
    throw validateError(999, err.message);
  }

  return true;
};

module.exports = {
  create,
};
