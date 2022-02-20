const jwt = require('jsonwebtoken');
const User = require('../models/User');
const rescue = require('express-rescue');
const { validateError, statusDict } = require('../helpers');

module.exports = rescue(async (req, _res, next) => {
  const token = req.headers.authorization;
  const JWT_SECRET = process.env.JWT_SECRET || 'S1E1C1R1E1T1K1E1Y';

  if (!token) {
    throw validateError(statusDict.unauthorized, 'Missing auth token');
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw validateError(statusDict.badRequest, 'Invalid signature');
  }

  const user = await User.findOne({ email: payload.email });

  if (!user) {
    const err = new Error('User not registered');
    err.statusCode = 401;
    return next(err);
  }

  req.user = payload;

  return next();
});
