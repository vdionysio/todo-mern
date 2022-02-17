/* eslint-disable */
module.exports = (err, _req, res, _next) => {
  /* eslint-enable */
  console.log(err);

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    error: {
      message: `Internal server error: ${err.message}`,
    },
  });
};
