const APIError = require(`../handlers/APIError`);
const { dataMapperReporting } = require(`../models/dataMapper/index`);
const debug = require(`debug`)(`adminReportingController`);

const adminReportingController = {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async allReporting(req, res) {
    console.log(req.params);
    // allows to check if our id pass in request is not different from id of the token
    if (parseInt(req.params.town_hall_id, 10) !== req.admin.town_hall_id) {
      throw new APIError(`Vous n'avez pas accès à cette page !`);
    }
    // returns all reports from the database
    const Allreporting = await dataMapperReporting.getAllReport(
      req.admin.town_hall_id
    );
    if (Allreporting) {
      res.json(Allreporting);
    } else {
      throw new APIError(`Impossible de récupérer les signalements`);
    }
  },
  async allReportingVisitor(req, res) {
    // eslint-disable-next-line max-len
    const reportings = await dataMapperReporting.getAllReportVisitor(
      parseInt(req.params.town_hall_id, 10)
    );
    if (reportings) {
      res.json(reportings);
    } else {
      throw new APIError(`Impossible de récupérer les signalements`);
    }
  },
  async oneReporting(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Vous n'avez pas accès à cette page !`);
    }
    const report = await dataMapperReporting.getOneReport(
      req.params.reporting_id
    );
    if (report) {
      res.status(200).json(report);
    }
    throw new APIError(`Impossible de récupérer le signalement`);
  },
  async deleteReporting(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Vous n'avez pas accès à cette page !`);
    }
    const report = await dataMapperReporting.deleteReport(
      req.params.reporting_id
    );
    if (report.rowCount) {
      res.status(200).send(`Le signalement est bien supprimer !`);
    } else {
      throw new APIError(`La mise à jour n'est pas possible !`);
    }
  },
  async modifyReporting(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Impossible de supprimer le signalement !`);
    }
    const values = {
      title: req.body.title,
      user_image: req.body.user_image,
      user_text: req.body.user_text,
      admin_text: req.body.admin_text,
      admin_image: req.body.admin_image,
      reporting_category: req.body.reporting_category,
      reporting_statut: req.body.reporting_statut,
      reporting_id: req.params.reporting_id,
    };
    const report = await dataMapperReporting.modifyReport(values);
    if (report.rowCount) {
      res.status(200).send(`La mise à jour est bien passée.`);
    } else {
      throw new APIError(`La mise à jour n'est pas possible !`);
    }
  },
  async postReporting(req, res) {
    const values = {
      title: req.body.title,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_text: req.body.user_text,
      user_image: req.body.user_image,
      reporting_category: req.body.reporting_category,
      town_hall_id: req.params.town_hall_id,
    };
    const report = await dataMapperReporting.postReport(values);
    if (report.rowCount) {
      res.status(200).send(`Votre signalement est effectué !`);
    } else {
      throw new APIError(`La mise à jour n'est pas possible !`);
    }
  },
};

module.exports = adminReportingController;
