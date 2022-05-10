require(`dotenv`).config();
const jwt = require(`jsonwebtoken`);
const APIError = require(`../handlers/APIError`);

/**
 * The method allows you to check if you are recovering a token or not
 * @method authenticateToken
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {void}
 */
const authenticateToken = (req, res, next) => {
  const token = req.headers.accesstoken;
  if (!token) {
    throw new APIError(`Vous n'êtes pas autorisé à accéder à ce contenu !`);
  }
  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.admin = user;
    next();
  });
};

module.exports = authenticateToken;
