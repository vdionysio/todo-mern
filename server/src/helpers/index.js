const jwt = require('jsonwebtoken');

const validateError = (status, message) => ({ status, message });

const generateToken = (email) => {
  const payload = {
    email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', {
    expiresIn: '1h',
  });

  return token;
};

module.exports = {
  validateError,
  generateToken,
};
