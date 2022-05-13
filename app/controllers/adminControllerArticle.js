const dataMapperArticle = require(`../models/dataMapper/dataMapperArticle`);
const APIError = require(`../handlers/APIError`);

const adminControllerArticle = {
  async allArticle(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Vous n'avez pas accès à cette page !`);
    }
    // returns all reports from the database
    const reportings = await dataMapperArticle.allReportingVisitor(req.admin.town_hall_id);
    if (reportings) {
      res.json(reportings);
    } else {
      throw new APIError(`Impossible de récupérer les signalements`);
    }
  },
  async oneArticle() {

  }
};

module.exports = adminControllerArticle;
