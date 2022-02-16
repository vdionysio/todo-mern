const { generateToken } = require('../helpers');
const service = require('../services/UserService');

const create = async (req, res, next) => {
  try {
    const user = req.body;
    await service.create(user);

    const token = generateToken(user.email);

    return res.status(201).json({ token });
  } catch (err) {
    console.log(err);
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

module.exports = {
  create,
  login,
};
