const debug = require(`debug`)(`handleError`);

const handleError = async (error, req, res, next) => {
  debug(error.message);
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status,
      message: error.message,
    },
  });
};

module.exports = handleError;
