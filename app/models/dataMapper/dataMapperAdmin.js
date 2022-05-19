const { status } = require("express/lib/response");
const client = require(`../dbClient`);
const debug = require(`debug`)(`datamapperlog`);
/**
 *@type {Object}
 *@export datamapper
 *@namespace datamapper
 */
const datamapper = {
  /**
   * Retrieve id of the town hall
   * By comparing the insee code of adminstrator and the town hall
   * @menberof datamapper
   * @method getTownHallId
   * @params {String} insee
   * @return {Number} town_hall_id
   * @param {Number} insee
   * @returns {Number} Return town_hall_id
   */
  async getTownHallId(insee) {
    const query = {
      text: `SELECT town_hall_id 
            FROM town_hall
            WHERE town_hall.insee = $1`,
      values: [insee],
    };
    const idTownHall = await client.query(query);
    if (!idTownHall.rowCount) {
      throw new Error(`Le code Insee est invalide !`);
    }
    return idTownHall.rows[0].town_hall_id;
  },
  /**
   * The method allows you to create an administrator
   * @menberof datamapper
   * @method userSignup
   * @param {String} pseudo
   * @param {Number} insee
   * @param {String} hashPassword
   * @param {String} email
   * @param {Number} idTownHall
   * @returns {Object} Returns object if insertion in database went well
   */
  async userSignup(pseudo, insee, hashPassword, email, idTownHall) {
    const query = {
      text: `INSERT INTO admin
              (pseudo,insee,password,email,town_hall_id)
              VALUES
              ($1,$2,$3,$4,$5);`,
      values: [pseudo, insee, hashPassword, email, idTownHall],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * The method allows you to log in as an admin
   * @menberof datamapper
   * @method userLogin
   * @param {String} email
   * @param {String} hashPassword
   * @returns {Object} Return administrator information
   */
  async userLogin(email, hashPassword) {
    const query = {
      text: `SELECT * FROM admin 
            WHERE 
            email = $1 AND password = $2;`,
      values: [email, hashPassword],
    };
    const data = await client.query(query);
    return data.rows[0];
  },
  /**
   * The method returns an administrator according to his email
   * @menberof datamapper
   * @method getOneAdmin
   * @param {String} email
   * @returns {Object} Return administrator information
   */
  async getOneAdmin(email) {
    const query = {
      text: `SELECT * FROM "admin" WHERE email = $1`,
      values: [email],
    };
    const data = await client.query(query);
    return data.rows[0];
  },
};

module.exports = datamapper;
