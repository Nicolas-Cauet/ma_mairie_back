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
<<<<<<< HEAD
<<<<<<< HEAD
  console.log(req.headers);
  const authHeader = req.headers.authorization;
  console.log(authHeader);
=======
  const authHeader = req.headers.authorization;
>>>>>>> reporting
  const token = authHeader && authHeader.split(` `)[1];
  if (token == null) {
    const error = new APIError(`Pas de token merci de vous reconnecter !`);
    res.sendStatus(error, 401);
  }
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if (err) {
      const error = new APIError(
<<<<<<< HEAD
        `le token n'a pas pu être vérifiée merci de recommencer !`
=======
        `le token n'a pas pu être vérifiée merci de recommencer !`,
>>>>>>> reporting
      );
      res.sendStatus(error, 403);
=======
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(` `)[1];
  if (token == null) {
    throw new APIError(`Pas de token merci de vous reconnecter !`);
  }
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new APIError(`le token n'a pas pu être vérifiée merci de recommencer !`);
>>>>>>> 5853bdf2793af3884d53a2c28032ce5236f62d86
    }
    req.admin = user;
    next();
  });
};

module.exports = authenticateToken;
