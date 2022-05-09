require(`dotenv`).config();
const APIError = require(`../handlers/APIError`);
const bcrypt = require(`bcrypt`);
const debug = require(`debug`)(`adminController`);
const jwt = require(`jsonwebtoken`);

const dataMapper = require(`../models/dataMapper/dataMapper`);

/**
 * @type {object}
 * @export adminController
 * @namespace adminController
 */
const adminController = {

  /**
   * @menberof adminController
   * @method signup
   * @params{
   * req @type {object}
   * }
   */
  async signup(req, res) {
    if (req.body.pseudo === `` || req.body.insee === `` || req.body.password === `` || req.body.email === ``) {
      throw new APIError(`Merci de saisir tous les champs !`);
    }
    // TODO mettre en place le hashage du mot de passe avec bcrypt
    //! mettre en place salt par default 10
    const salt = await bcrypt.genSalt();
    //! on hash le password
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //! TODO  Verifier que l'utilisateur n'existe pas déjà en BDD
    const getId = await dataMapper.getTownHallId(req.body.insee);
    const existingUser = await dataMapper.getOneAdmin(req.body.email);
    if (existingUser.rowCount > 0) {
      throw new APIError(`L'utilisateur existe déja`);
    }
    const user = await dataMapper
      .userSignup(req.body.pseudo, req.body.insee, hashPassword, req.body.email, getId);
      res.status(200).send(`Utilisateur connecter`);
    if (!user.rowCount) {
      throw new APIError(`Impossible d'enregistrer 'l'utilisateur en base !`);
    }
  },
  /**
   * @menberof adminController
   * @method login
   * @params {
   * req @type {object}
   * }
   * @return {object}
   */
  async login(req, res) {
    if (req.session.user) {
      throw new APIError(`Vous êtes déja connecté`);
    }
    // function generateAccesToken(users) {
    //   return jwt.sign(users, process.env.ACCES_TOKEN_SECRET, { expiresIn: `3600s` });
    // }
    const user = req.body;
    const existingUser = await dataMapper.getOneAdmin(req.body.email);
    const match = await bcrypt.compare(req.body.password, existingUser.rows[0].password);
    if (match) {
      const data = await dataMapper.userLogin(req.body.pseudo, req.body.email);
      // mettre le token sur le user
      // const accessToken = generateAccesToken(data);
      // res.json(jwt.decode(accessToken));
      // const jwtContent = { toto: titi };
          const jwtOptions = { 
            algorithm: 'HS256', 
            expiresIn: '3h' 
          };
          console.log('<< 200', data.username);
          res.json({ 
            data:data,
            logged: true, 
            pseudo: data.username,
            token: jwt.sign(/*jwtContent*/, process.env.ACCES_TOKEN_SECRET, jwtOptions),
          });
    } else {
      throw new APIError(`Impossible de se connecter recommencer !`);
    }
  },
};

module.exports = adminController;

