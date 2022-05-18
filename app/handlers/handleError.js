const debug = require(`debug`)(`handleError`);

const handleError = async (err, req, res, next) => {
  debug(err.message);
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
};

module.exports = handleError;
