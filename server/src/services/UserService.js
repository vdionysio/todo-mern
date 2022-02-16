const User = require('../models/User');
const UserSchema = require('../schemas/userSchema');
const loginSchema = require('../schemas/loginSchema');
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

const login = async (credentials) => {
  const { error } = loginSchema.validate(credentials);

  if (error) throw validateError(400, error.message);

  const userExists = await User.findOne({
    email: credentials.email,
    password: credentials.password,
  });

  if (!userExists) throw validateError(400, 'Invalid fields');

  return true;
};

module.exports = {
  create,
  login,
};
