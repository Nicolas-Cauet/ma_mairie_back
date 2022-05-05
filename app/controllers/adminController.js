const APIError = require(`../handlers/APIError`);
const debug = require(`debug`)(`adminController`);
const jwt = require(`jsonwebtoken`);

const secreKey = `jesdrjfgokujhs<uopirghuoizsqhguoijhsuqoijkgrh`;
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
  async signup(req) {
    const user = await dataMapper.inscription(req.body);
    if (!user) {
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
  async login(req) {
    jwt.sign(req.body, secreKey);
    const data = await dataMapper.login(req.body);
    if (!data) {
      throw new APIError(`Impossible de se connecter recommencer !`);
    }
    req.session.user = data;
    debug(req.session.user);
  },
};

module.exports = adminController;
