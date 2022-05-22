require(`dotenv`).config();
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const secretKey = process.env.ACCES_TOKEN_SECRET;
const { dataMapperAdmin } = require(`../models/dataMapper/index`);

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
  async signup(req, res, next) {
    if (req.body.pseudo === `` || req.body.insee === `` || req.body.password === `` || req.body.email === ``) {
      const err = new Error(`Merci de saisir tous les champs !`);
      err.status = 406;
      next(err);
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const townHallId = await dataMapperAdmin.getTownHallId(req.body.insee);
    const existingUser = await dataMapperAdmin.getOneAdmin(req.body.email);
    if (existingUser) {
      const err = new Error(`L'utilisateur existe déja`);
      next(err);
    }
    const userSignup = await dataMapperAdmin
      .userSignup(req.body.pseudo, req.body.insee, hashPassword, req.body.email, townHallId);
    if (!userSignup.rowCount) {
      const err = new Error(`La connexion a échoué vérifier vos données !`);
      next(err);
    }
    res.status(200).send(`L'utilisateur est bien enregistré en base !`);
  },
  /**
   * The method allows you to log in as an administrator
   * @menberof adminController
   * @method signup
   * @param {Object} req.body
   * @param {Object} res
   * @returns {Object} Return token and town_hall_id
   */
  async login(req, res, next) {
    const existingUser = await dataMapperAdmin.getOneAdmin(req.body.email);
    if (!existingUser) {
      const err = new Error(`Adresse e-mail saisie n'existe pas !`);
      next(err);
    }
    const match = await bcrypt.compare(req.body.password, existingUser.password);
    if (match) {
      const data = await dataMapperAdmin.userLogin(req.body.email, existingUser.password);
      const user = { pseudo: data.pseudo, town_hall_id: data.town_hall_id };
      const townHallId = user.town_hall_id;
      const accessToken = jwt.sign(user, secretKey);
      res.json({ accessToken, townHallId });
    } else {
      const err = new Error(`Votre mail et/ou mot de passe sont incorrect !`);
      next(err);
    }
  },
};

module.exports = adminController;
