const APIError = require(`../handlers/APIError`);
const { dataMapperCouncil } = require(`../models/dataMapper`);
const debug = require(`debug`)(`adminController`);

/**
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
  async allCouncil(req, res) {
    const townHallStaff = await dataMapperCouncil.getAllCouncil(
      parseInt(req.params.town_hall_id, 10),
    );
    if (townHallStaff) {
      res.json(townHallStaff).status(200);
    } else {
      throw new APIError(`Impossible de récupèrer les Conseillers`);
    }
  },
};

module.exports = adminControllerCouncil;
