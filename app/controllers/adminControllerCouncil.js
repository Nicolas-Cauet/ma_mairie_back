const APIError = require(`../handlers/APIError`);
const { dataMapperCouncil } = require(`../models/dataMapper`);
const debug = require(`debug`)(`adminController`);

/**
<<<<<<< HEAD
   *
   * @param {*} req
   * @param {*} res
   */
const adminControllerCouncil = {
=======
   * @type {Object}
   * @export adminControllerCouncil
   * @namespace adminControllerCouncil
   */
const adminControllerCouncil = {
  /** The method returns the list of municipal councilors and the mayor
   * @menberof adminControllerCouncil
   * @method allCouncil
   * @param {Object} req
   * @param {Object} res
   * @returns {Array} Return all municipal councilors
   */
>>>>>>> 5853bdf2793af3884d53a2c28032ce5236f62d86
  async allCouncil(req, res) {
    const townHallStaff = await dataMapperCouncil.getAllCouncil(
      parseInt(req.params.town_hall_id, 10),
    );
    if (townHallStaff) {
      res.json(townHallStaff).status(200);
    } else {
<<<<<<< HEAD
      const error = new APIError(`Impossible de récupèrer les Conseillers`);
      res.json(error);
=======
      throw new APIError(`Impossible de récupèrer les Conseillers`);
>>>>>>> 5853bdf2793af3884d53a2c28032ce5236f62d86
    }
  },
};

module.exports = adminControllerCouncil;
