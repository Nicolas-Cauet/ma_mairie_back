const client = require(`../dbClient`);

/**
 * @type {Object}
 * @exports dataMapperReporting
 * @namespace dataMapperReporting
 */
const dataMapperReporting = {
  /**
   * the method allows to return all the reports
   * @menberof dataMapperReporting
   * @method getAllReport
   * @param {Number} townHallId
   * @returns {Array} Array Returns all reports administrator
   */
  async getAllReport(townHallId) {
    const query = {
      text: `SELECT * FROM reporting
            WHERE town_hall_id = $1;`,
      values: [townHallId],
    };
    const data = await client.query(query);
    return data.rows;
  },
  /**
   * the method allows to return all the reports
   * @menberof dataMapperReporting
   * @method getAllReportVisitor
   * @param {Number} townHallId
   * @returns {Array} Array Returns all reports visitor
   */
  async getAllReportVisitor(townHallId) {
    const query = {
      text: `SELECT * FROM reporting WHERE town_hall_id = $1
            AND NOT reporting_statut = $2;`,
      values: [townHallId, `Non validé`],
    };
    const data = await client.query(query);
    return data.rows;
  },
  /**
   * the method allows to return one report
   * @menberof dataMapperReporting
   * @method getOneReport
   * @param {Number} townHallId
   * @returns {Object} Object Returns one report
   */
  async getOneReport(reportId) {
    const query = {
      text: `SELECT * FROM reporting
      WHERE reporting_id = $1;`,
      values: [reportId],
    };
    const data = await client.query(query);
    return data.rows[0];
  },
  /**
   * The method allows you to delete a report
   * @menberof dataMapperReporting
   * @method deleteReport
   * @param {Number} id
   * @returns void
   */
  async deleteReport(id) {
    const query = {
      text: `DELETE FROM reporting
            WHERE reporting_id = $1`,
      values: [id],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * The method is used to update a report
   * @menberof dataMapperReporting
   * @method modifyReport
   * @param {Object} object
   * @returns void
   */
  async modifyReport(object) {
    const query = {
      text: `UPDATE reporting
      SET admin_text = $1, reporting_statut = $2
      WHERE reporting_id = $3; `,
      // eslint-disable-next-line max-len
      values: [
        object.admin_text,
        object.reporting_statut,
        object.reporting_id,
      ],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * The method is used to post a report as a visitor
   * @menberof dataMapperReporting
   * @method modifyReport
   * @param {Object} object
   * @returns void
   */
  async postReport(object) {
    const query = {
      text: `INSERT INTO reporting
            (title, email, phonenumber, first_name, last_name, user_text, user_image, reporting_category, user_ip, town_hall_id)
      VALUES ($1, $2, $3, $4,  $5,  $6, $7, $8, $9, $10)`,
      // eslint-disable-next-line max-len
      values: [
        object.title,
        object.email,
        object.phonenumber,
        object.first_name,
        object.last_name,
        object.user_text,
        object.user_image,
        object.reporting_category,
        object.user_ip,
        object.town_hall_id,
      ],
    };
    const data = await client.query(query);
    return data;
  },
};

module.exports = dataMapperReporting;
