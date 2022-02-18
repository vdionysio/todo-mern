const rescue = require('express-rescue');
const { generateToken } = require('../helpers');
const User = require('../models/User');
const service = require('../services/UserService');

const create = rescue(async (req, res, _next) => {
  const user = req.body;
  await service.create(user);

  const token = generateToken(user.email);

  return res.status(201).json({ token });
});

const login = rescue(async (req, res, _next) => {
  const credentials = req.body;
  await service.login(credentials);

  const token = generateToken(credentials.email);

  return res.status(200).json({ token });
});

const getByToken = rescue(async (req, res, _next) => {
  const { email } = req.user;

  const user = await User.findOne({ email });
  const { displayName } = user;
  return res.status(200).json({ displayName, email });
});

module.exports = {
  create,
  login,
  getByToken,
};
