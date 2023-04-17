require(`dotenv`).config();
// const debug = require(`debug`)(`ADMINCONTROLLER`);

const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const secretKey = process.env.ACCES_TOKEN_SECRET;
const { dataMapperAdmin } = require(`../models/dataMapper/index`);
const HandleError = require(`../handlers/handleError`);
/**
 * @type {Object}
 * @export adminController
 * @namespace adminController
 */
const adminController = {
  /** The method allows you to create an administrator in the database
   * @menberof adminController
   * @method signup
   * @param {Object} req.body
   * @param {Object} res
   * @returns void
   */
  async signup(req, res) {
    // eslint-disable-next-line max-len, eqeqeq
    if (req.body.pseudo === `` || req.body.insee === `` || req.body.password === `` || req.body.email === ``) {
      throw new HandleError(`Merci de saisir tous les champs.`);
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const townHallId = await dataMapperAdmin.getTownHallId(req.body.insee);
    const existingUser = await dataMapperAdmin.getOneAdmin(req.body.email);
    if (existingUser) {
      if (existingUser.pseudo === req.body.pseudo) {
        throw new HandleError(`Le pseudo est déjà prit merci d'en saisir un autre.`);
      } else if (existingUser.email === req.body.email) {
        throw new HandleError(`Adresse email est déjà prise merci d'en saisir une autre.`);
      }
    }
    if (!existingUser) {
      const userSignup = await dataMapperAdmin.userSignup(
        req.body.pseudo,
        req.body.insee,
        hashPassword,
        req.body.email,
        townHallId,
      );

      if (!userSignup.rowCount) {
        throw new HandleError(`La creation de votre compte a échoué vérifier vos données.`);
      } else {
        res
          .status(200)
          .json(`Votre compte a bien été créé, vous pouvez vous connecter.`);
      }
    }
  },
  /**
   * The method allows you to log in as an administrator
   * @menberof adminController
   * @method signup
   * @param {Object} req.body
   * @param {Object} res
   * @returns {Object} Return token and town_hall_id
   */
  async login(req, res) {
    const existingUser = await dataMapperAdmin.getOneAdmin(req.body.email);
    if (!existingUser) {
      throw new HandleError(`Impossible de récupérer Administrateur en base.`);
    }
    const match = await bcrypt.compare(
      req.body.password,
      existingUser.password,
    );
    if (match) {
      const data = await dataMapperAdmin.userLogin(
        req.body.email,
        existingUser.password,
      );
      const user = { pseudo: data.pseudo, town_hall_id: data.town_hall_id };
      const townHallId = user.town_hall_id;
      const accessToken = jwt.sign(user, secretKey);
      res.json({ accessToken, townHallId });
    } else {
      throw new HandleError(`La connexion a échoué vérifier vos données.`);
    }
  },
};

module.exports = adminController;
