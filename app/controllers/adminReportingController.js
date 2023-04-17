const { dataMapperReporting } = require(`../models/dataMapper/index`);
const HandleError = require(`../handlers/handleError`);

const debug = require(`debug`)(`ADMINREPORT`);
/**
 * @type {object}
 * @export adminReportingController
 * @namespace adminReportingController
 */
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
    if (parseInt(req.params.town_hall_id, 10) !== req.admin.town_hall_id) {
      throw new HandleError(`Vous n'êtes pas autorisé à accéder à cette page.`, 401);
    }
    const Allreporting = await dataMapperReporting.getAllReport(
      req.params.town_hall_id,
    );
    if (Allreporting) {
      res.json(Allreporting).status(200);
    } else {
      throw new HandleError(`Impossible de récupérer tous les signalements.`);
    }
  },
  /**
   * The method returns all visitor reports
   * @menberof adminReportingController
   * @method allReportingVisitor
   * @param {Object} req
   * @param {Object} res
   * @returns Return all reports visitor
   */
  async allReportingVisitor(req, res) {
    // eslint-disable-next-line max-len
    const reportings = await dataMapperReporting.getAllReportVisitor(
      parseInt(req.params.town_hall_id, 10),
    );
    if (reportings) {
      res.json(reportings).status(200);
    } else {
      throw new HandleError(`Impossible de récupérer tous les signalements.`);
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
      throw new HandleError(`Vous n'êtes pas autorisé à accéder à cette page.`, 401);
    }
    const report = await dataMapperReporting.getOneReport(
      req.params.reporting_id,
    );
    if (report) {
      res.json(report).status(200);
    } else {
      throw new HandleError(`Impossible de récupérer le signalement.`);
    }
  },
  /**
   * The method allows you to delete a report as administrator
   * @menberof adminReportingController
   * @method deleteReporting
   * @param {Object} req
   * @param {Object} res
   * @returns void
   */
  async deleteReporting(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new HandleError(`Vous n'êtes pas autorisé à accéder à cette page.`, 401);
    }
    const deleteReport = await dataMapperReporting.getOneReport(req.params.reporting_id);
    const report = await dataMapperReporting.deleteReport(
      req.params.reporting_id,
    );
    if (report.rowCount) {
      res.status(200).json(`Le signalement "${deleteReport.title}" est bien supprimé !`);
    } else {
      throw new HandleError(`Impossible de supprimer le signalement.`);
    }
  },
  /**
   * The method allows you to modify a report as administrator
   * @menberof adminReportingController
   * @method modifyReporting
   * @param {Object} req
   * @param {Object} res
   * @returns void
   */
  async modifyReporting(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new HandleError(`Vous n'êtes pas autorisé à accéder à cette page.`, 401);
    }
    debug(res.body);
    const getReport = await dataMapperReporting.getOneReport(req.params.reporting_id);
    const values = {
      admin_text: req.body.admin_text,
      reporting_statut: req.body.reporting_statut,
      reporting_id: req.params.reporting_id,
    };
    const report = await dataMapperReporting.modifyReport(values);
    if (report.rowCount) {
      res.status(200).send(`Le signalement "${getReport.title}" a bien été mis à jour.`);
    } else {
      throw new HandleError(`Impossible de modifier le signalement.`);
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
      user_ip: req.headers[`x-forwarded-for`]?.split(`,`).shift()
      || req.socket?.remoteAddress,
      town_hall_id: req.params.town_hall_id,
    };
    const report = await dataMapperReporting.postReport(values);
    if (report.rowCount) {
      res.status(200).send(`Le signalement ${req.body.title} de ${req.body.first_name} est effectué.`);
    } else {
      throw new HandleError(`Impossible de poster votre  signalement.`);
    }
  },
};

module.exports = adminReportingController;
