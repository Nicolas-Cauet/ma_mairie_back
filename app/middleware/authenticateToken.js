require(`dotenv`).config();
const jwt = require(`jsonwebtoken`);

const authenticateToken = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers['accesstoken'];
  console.log(token);
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
  if (err) return res.sendStatus(403);
  req.user = user;
  next();
  });
};

module.exports = authenticateToken;
