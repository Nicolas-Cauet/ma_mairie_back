require(`dotenv`).config();
const jwt = require(`jsonwebtoken`);
const APIError = require(`../handlers/APIError`);

/**
 * The method allows you to check if you are recovering a token or not
 * @method authenticateToken
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {String} Returns administrator id
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(` `)[1];
  if (token == null) {
    throw new APIError(`Pas de token merci de vous reconnecter !`);
  }
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new APIError(`le token n'a pas pu être vérifiée merci de recommencer !`);
    }
    req.admin = user;
    next();
  });
};

module.exports = authenticateToken;
