const { generateToken } = require('../helpers');
const User = require('../models/User');
const service = require('../services/UserService');

const create = async (req, res, next) => {
  try {
    const user = req.body;
    await service.create(user);

    const token = generateToken(user.email);

    return res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const credentials = req.body;
    await service.login(credentials);

    const token = generateToken(credentials.email);

    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};

const getByToken = async (req, res, next) => {
  try {
    const { email } = req.user;

    const user = await User.findOne({ email });
    const { displayName } = user;
    return res.status(200).json({ displayName, email });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  create,
  login,
  getByToken,
};
