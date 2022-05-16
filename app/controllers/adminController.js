require(`dotenv`).config();
const APIError = require(`../handlers/APIError`);
const bcrypt = require(`bcrypt`);
const debug = require(`debug`)(`adminController`);
const jwt = require(`jsonwebtoken`);
const secretKey = process.env.ACCES_TOKEN_SECRET;
const { dataMapperAdmin } = require(`../models/dataMapper/index`);

/**
 * @type {object}
 * @export adminController
 * @namespace adminController
 */
const adminController = {

  /**
   * @menberof adminController
   * @method signup
   * @param {Object} req.body
   * @param {Object} res
   * @returns {VoidFunction}
   */
  async signup(req, res) {
    if (req.body.pseudo === `` || req.body.insee === `` || req.body.password === `` || req.body.email === ``) {
      throw new APIError(`Merci de saisir tous les champs !`);
    }
    // Hash the password user
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    // Retrieve id of the town hall
    // By comparing the insee code of adminstrator and the town hall
    const townHallId = await dataMapperAdmin.getTownHallId(req.body.insee);
    // We check that the user does not already exist in the database
    const existingUser = await dataMapperAdmin.getOneAdmin(req.body.email);
    if (existingUser) {
      throw new APIError(`L'utilisateur existe déja`);
    }
    const userSignup = await dataMapperAdmin
      .userSignup(req.body.pseudo, req.body.insee, hashPassword, req.body.email, townHallId);
      // we check if we have registered a user in the database if there is none we return an error
    if (userSignup) {
      res.status(200).send(`Utilisateur créer en base !`);
    }
    if (!userSignup.rowCount) {
      throw new APIError(`Impossible d'enregistrer 'l'utilisateur en base !`);
    }
  },
    /**
   * @menberof adminController
   * @method signup
   * @param {Object} req.body
   * @param {Object} res
   * @returns {VoidFunction}
   */ 
  async login(req, res) {
    // We check that the user does not already exist in the database
    const existingUser = await dataMapperAdmin.getOneAdmin(req.body.email);
    // We check that the password of the request corresponds to the password hash
    const match = await bcrypt.compare(req.body.password, existingUser.password);
    if (match) {
      const data = await dataMapperAdmin.userLogin(req.body.email, existingUser.password);
      debug(data);
      const user = { pseudo: data.pseudo, town_hall_id: data.town_hall_id };
      const townHallId = user.town_hall_id;
      const accessToken = jwt.sign(user, secretKey);
      res.json({ accessToken, townHallId });
    } else {
      throw new APIError(`Impossible de se connecter recommencer !`);
    }
  },
};

module.exports = adminController;
