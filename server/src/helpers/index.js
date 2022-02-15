const validateError = (status, message) => {
  const errorObject = {
    status,
    message,
  };

  return new Error(errorObject);
};

module.exports = {
  validateError,
};
