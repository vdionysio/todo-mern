const User = require('../models/User');
const UserSchema = require('../schemas/userSchema');
const loginSchema = require('../schemas/loginSchema');
const bcrypt = require('bcrypt');
const { validateError, statusDict } = require('../helpers');

const create = async (input) => {
  const { error } = UserSchema.validate(input);

  if (error) throw validateError(statusDict.badRequest, error.message);

  try {
    const newUser = new User(input);
    await newUser.save();
    return true;
  } catch (err) {
    throw validateError(statusDict.conflict, err.message);
  }
};

const login = async (credentials) => {
  const { error } = loginSchema.validate(credentials);

  if (error) throw validateError(400, error.message);

  const userExists = await User.findOne({ email: credentials.email });
  const isPasswordValid = await bcrypt.compareSync(
    credentials.password,
    userExists.password
  );

  if (!isPasswordValid) throw validateError(400, 'Invalid user or password');

  return true;
};

module.exports = {
  create,
  login,
};
