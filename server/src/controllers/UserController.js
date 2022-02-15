const { generateToken } = require('../helpers');
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

module.exports = {
  create,
};
