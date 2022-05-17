/**
 * The method allows to encapsulate our different methods in an error handler
 * @param {Function} method
 * @returns {Object} Return error to the next middleware
 */
const routerWrapper = (method) => async (req, res, next) => {
  try {
    await method(req, res, next);
  } catch (err) {
    console.log(err, `ROUTERWRAPPER !!!!!!!`);
    next(err);
  }
};

module.exports = routerWrapper;
