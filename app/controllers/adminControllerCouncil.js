const APIError = require(`../handlers/APIError`);
const { dataMapperCouncil } = require(`../models/dataMapper`);
const debug = require(`debug`)(`adminController`);

/**
   *
   * @param {*} req
   * @param {*} res
   */
const adminControllerCouncil = {
  async allCouncil(req, res) {
    const townHallStaff = await dataMapperCouncil.getAllCouncil(
      parseInt(req.params.town_hall_id, 10),
    );
    if (townHallStaff) {
      res.json(townHallStaff).status(200);
    } else {
      const error = new APIError(`Impossible de récupèrer les Conseillers`);
      res.json(error);
    }
  },
};

module.exports = adminControllerCouncil;
