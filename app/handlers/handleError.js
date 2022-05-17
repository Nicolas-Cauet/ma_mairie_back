const APIError = require(`./APIError`);

/**
 * @method handleError
 * @param {Object} err
 * @param {Objetc} req
 * @param {Object} res
 * @returns {String} Returns error message
 */
const handleError = async (req, res, err) => {
  let myError;
  if (err instanceof APIError) {
    myError = err;
  } else {
    myError = new APIError(err, req.url);
  }
  await myError.log();
  res.send(console.log(`ICI MIDDLEWARE ERROR RETOUR FRONT`));
  // res.status(myError.status).send(myError.message, `COUCOUCOUCOUCOUCO`);
};

module.exports = handleError;
