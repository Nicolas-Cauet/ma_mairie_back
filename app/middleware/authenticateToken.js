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
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(` `)[1];
  if (token == null) {
    const error = new APIError(`Pas de token merci de vous reconnecter !`);
    res.sendStatus(error, 401);
  }
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if (err) {
      const error = new APIError(
        `le token n'a pas pu être vérifiée merci de recommencer !`,
      );
      res.sendStatus(error, 403);
    }
    req.admin = user;
    next();
  });
};

module.exports = authenticateToken;
