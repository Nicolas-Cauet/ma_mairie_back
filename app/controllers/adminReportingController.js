const APIError = require(`../handlers/APIError`);
const { dataMapperReporting } = require(`../models/dataMapper/index`);
const debug = require(`debug`)(`adminReportingController`);

<<<<<<< HEAD
=======
/**
 * @type {object}
 * @export adminReportingController
 * @namespace adminReportingController
 */
>>>>>>> 5853bdf2793af3884d53a2c28032ce5236f62d86
const adminReportingController = {
  /**
   * The method returns all administrator reports
   * @menberof adminReportingController
   * @method allReporting
   * @param {Object} req
   * @param {Object} res
   * @returns Return all reports Administrator
   */
  async allReporting(req, res) {
<<<<<<< HEAD
    // allows to check if our id pass in request is not different from id of the token
    // if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
    //   throw new APIError(`Vous n'avez pas accès à cette page !`);
    // }
    // returns all reports from the database
    const reportings = await dataMapperReporting.getAllReport(req.body.town_hall_id);
    // allows to check if our id pass in request is not different from id of the token
    if (parseInt(req.params.town_hall_id, 10) !== req.admin.town_hall_id) {
      throw new APIError(`Vous n'avez pas accès à cette page !`);
    }
    // returns all reports from the database
    const Allreporting = await dataMapperReporting.getAllReport(
      req.admin.town_hall_id,
    );
    if (Allreporting) {
      res.json(Allreporting);
=======
    if (parseInt(req.params.town_hall_id, 10) !== req.admin.town_hall_id) {
      throw new APIError(`Vous n'avez pas accès à cette page !`);
    }
    const Allreporting = await dataMapperReporting.getAllReport(
      parseInt(req.params.town_hall_id, 10),
    );
    if (Allreporting) {
      res.json(Allreporting).status(200);
>>>>>>> 5853bdf2793af3884d53a2c28032ce5236f62d86
    } else {
      throw new APIError(`Impossible de récupérer les signalements`);
    }
  },
<<<<<<< HEAD
=======
  /**
   * The method returns all visitor reports
   * @menberof adminReportingController
   * @method allReportingVisitor
   * @param {Object} req
   * @param {Object} res
   * @returns Return all reports visitor
   */
>>>>>>> 5853bdf2793af3884d53a2c28032ce5236f62d86
  async allReportingVisitor(req, res) {
    // eslint-disable-next-line max-len
    const reportings = await dataMapperReporting.getAllReportVisitor(
      parseInt(req.params.town_hall_id, 10),
    );
    if (reportings) {
      res.json(reportings).status(200);
    } else {
      throw new APIError(`Impossible de récupérer les signalements`);
    }
  },
  /**
   * The method returns one reports
   * @menberof adminReportingController
   * @method oneReporting
   * @param {Object} req
   * @param {Object} res
   * @returns Return one reports visitor
   */
  async oneReporting(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Vous n'avez pas accès à cette page !`);
    }
    const report = await dataMapperReporting.getOneReport(
      req.params.reporting_id,
    );
    if (report) {
      res.json(report).status(200);
    }
    throw new APIError(`Impossible de récupérer le signalement`);
  },
  /**
   * The method allows you to delete a report
   * @menberof adminReportingController
   * @method deleteReporting
   * @param {Object} req
   * @param {Object} res
   * @returns void
   */
  async deleteReporting(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Vous n'avez pas accès à cette page !`);
    }
    const report = await dataMapperReporting.deleteReport(
      req.params.reporting_id,
    );
    if (report.rowCount) {
      res.status(200).send(`Le signalement est bien supprimer !`);
    } else {
      throw new APIError(`La mise à jour n'est pas possible !`);
    }
  },
  /**
   * The method allows you to modify a report
   * @menberof adminReportingController
   * @method modifyReporting
   * @param {Object} req
   * @param {Object} res
   * @returns void
   */
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
  /**
   * The method allows you to post a report as a visitor
   * @menberof adminReportingController
   * @method postReporting
   * @param {Object} req
   * @param {Object} res
   * @returns void
   */
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
