const dataMapperArticle = require(`../models/dataMapper/dataMapperArticle`);
const APIError = require(`../handlers/APIError`);

const adminControllerArticle = {
  async allArticle(req, res) {
    const reportings = await dataMapperArticle.getAllReport(req.params.town_hall_id);
    if (reportings) {
      res.json(reportings);
    } else {
      throw new APIError(`Impossible de récupérer les signalements`);
    }
  },
};

module.exports = adminControllerArticle;
