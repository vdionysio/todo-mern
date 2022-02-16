const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
  if (!token) {
    const err = new Error('missing auth token');
    err.statusCode = 401;

    return next(err);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      const err = new Error('User not registered');
      err.statusCode = 401;
      return next(err);
    }
    req.user = payload;
    return next();
  } catch (err) {
    err.message = 'jwt malformed';
    err.statusCode = 401;
    return next(err);
  }
};
