require(`dotenv`).config();
const jwt = require(`jsonwebtoken`);
const HandleError = require(`../handlers/handleError`);
// const debug = require(`debug`)(`TOKEN`);
/**
 * The method allows you to check if you are recovering a token or not
 * @method authenticateToken
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {String} Returns administrator id
 */
const authenticateToken = (req, _, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(` `)[1];
  if (token == null) {
    throw new HandleError(`Vous devez être connecté pour accéder à cette page.`, 401);
  }
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (error, user) => {
    if (error) {
      throw new HandleError(`Votre session a expiré, merci de vous reconnecter.`, 401);
    }
    req.admin = user;
    next();
  });
};

module.exports = authenticateToken;
