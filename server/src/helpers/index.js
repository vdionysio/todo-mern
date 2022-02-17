const jwt = require('jsonwebtoken');

function ErrorFormat(status, message) {
  this.status = status;
  this.message = message;
}

const validateError = (status, message) => {
  const newError = new ErrorFormat(status, message);
  // console.log(new)
  return newError;
};

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
