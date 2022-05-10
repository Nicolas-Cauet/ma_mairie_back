require(`dotenv`).config();
const APIError = require(`../handlers/APIError`);
const bcrypt = require(`bcrypt`);
const debug = require(`debug`)(`adminController`);
const jsonwebtoken = require(`jsonwebtoken`);
const jwtSecret = `OurSuperLongRandomSecretToSignOurJWTgre5ezg4jyt5j4ui64gn56bd4sfs5qe4erg5t5yjh46yu6knsw4q`;

const dataMapper = require(`../models/dataMapper/dataMapper`);

/**
 * @type {object}
 * @export adminController
 * @namespace adminController
 */
const adminController = {

  /**
   * The method allows to register an administrator
   * @menberof adminController
   * @method signup
   * @params {Object} req
   */
  async signup(req, res) {
    if (req.body.pseudo === `` || req.body.insee === `` || req.body.password === `` || req.body.email === ``) {
      throw new APIError(`Merci de saisir tous les champs !`);
    }
    // Hash the password user
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    // Retrieve id of the town hall
    // By comparing the insee code of adminstrator and the town hall
    const townHallId = await dataMapper.getTownHallId(req.body.insee);
    // We check that the user does not already exist in the database
    const existingUser = await dataMapper.getOneAdmin(req.body.email);
    if (existingUser) {
      throw new APIError(`L'utilisateur existe déja`);
    }
    const userSignup = await dataMapper
      .userSignup(req.body.pseudo, req.body.insee, hashPassword, req.body.email, townHallId);
      // we check if we have registered a user in the database if there is none we return an error
    if (!userSignup.rowCount) {
      throw new APIError(`Impossible d'enregistrer 'l'utilisateur en base !`);
    }
    // TODO res.status ?????
  },
  /**
   * @menberof adminController
   * @method login
   * @params {Object} req
   * @return {Object} pseudo
   */
  async login(req) {
    // We check that the user does not already exist in the database
    const existingUser = await dataMapper.getOneAdmin(req.body.email);
    // We check that the password of the request corresponds to the password hash
    const match = await bcrypt.compare(req.body.password, existingUser.password);
    if (match) {
      const data = await dataMapper.userLogin(req.body.email, existingUser.password);
      // TODO TOKEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEN
    } else {
      throw new APIError(`Impossible de se connecter recommencer !`);
    }
  },
};

module.exports = adminController;
