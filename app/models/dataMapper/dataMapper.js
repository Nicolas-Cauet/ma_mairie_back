const debug = require(`debug`)(`dataMapper`);

const client = require(`../dbClient`);

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
 */
  async getTownHallId(insee) {
    const query = {
      text: `SELECT town_hall_id 
             FROM town_hall
             WHERE town_hall.insee = $1`,
      values: [insee],
    };
    const idTownHall = await client.query(query);
    return idTownHall.rows[0].town_hall_id;
  },
  /**
   * The method allows you to create an administrator
   * @menberof datamapper
   * @method userSignup
   * @params {String} pseudo
   * @params {String} insee
   * @params {String} hashPassword
   * @params {String} email
   * @params {Number} idTownHall
   * @return {Object} data
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
   * the method allows you to log in as an admin
   * @menberof datamapper
   * @method userLogin
   * @params {String} email
   * @params {String} hashPassword
   * @return {object}
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
   * @menberof datamapper
   * @method getOneAdmin
   * @params {String} email
   * @return {Object}
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
