const User = require('../models/User');
const UserSchema = require('../schemas/userSchema');
const { validateError } = require('../helpers');

const create = async (input) => {
  const { error } = UserSchema.validate(input);

  if (error) throw validateError(400, error.message);

  const newUser = new User(input);

  try {
    await newUser.save();
    return true;
  } catch (err) {
    throw validateError(409, err.message);
  }
};

module.exports = {
  create,
};