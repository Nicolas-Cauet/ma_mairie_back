const handleError = async (err, req, res, ext) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
};

module.exports = handleError;
