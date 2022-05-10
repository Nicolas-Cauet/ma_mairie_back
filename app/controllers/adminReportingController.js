const APIError = require(`../handlers/APIError`);
const { dataMapperReporting } = require(`../models/dataMapper/index`);
const debug = require(`debug`)(`adminReportingController`);

/**
 * @type {Object}
 * @export adminReportingController
 * @namespace adminReportingController
 */
const adminReportingController = {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async allReporting(req, res) {
    // allows to check if our id pass in request is not different from id of the token
    if (Number(req.params.id) !== req.admin.town_hall_id) {
      throw new APIError(`Vous n'avez pas accès à cette page !`);
    }
    // returns all reports from the database
    const reportings = await dataMapperReporting.allReport(req.admin.town_hall_id);
    res.json(reportings);
  },
};

module.exports = adminReportingController;
