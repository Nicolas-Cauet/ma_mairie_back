const routerWrapper = (method) => async (req, res, next) => {
  try {
    await method(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = routerWrapper;
