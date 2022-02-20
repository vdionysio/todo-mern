const jwt = require('jsonwebtoken');

const validateError = (status, message) => {
  const newError = new Error(message);
  newError.status = status;

  return newError;
};

const generateToken = (email) => {
  const payload = {
    email,
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || 'S1E1C1R1E1T1K1E1Y',
    {
      expiresIn: '1h',
    }
  );

  return token;
};

const statusDict = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  conflict: 409,
};

module.exports = {
  validateError,
  generateToken,
  statusDict,
};
