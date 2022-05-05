// const debug = require("debug")("dataMapper");psuedo

const client = require(`../dbClient`);

/**
 *@type {Object}
 *@export datamapper
 *@namespace datamapper
 */
const datamapper = {
  /**
   * The method allows you to create an administrator
   * @menberof datamapper
   * @method signup
   * @params {object}
   */
  async signup(object) {
    const query = {
      text: `INSERT INTO "admin"
               (pseudo,insee,password,email,town_hall_id)
               VALUES
               ($1,$2,$3,$4,$5);`,
      values: [object.pseudo, object.insee, object.password, object.email, object.town_hall_id],
    };
    await client.query(query);
  },
  /**
   * the method allows you to log in as an admin
   * @menberof datamapper
   * @method login
   * @params {object}
   * @return {object}
   */
  async login(object) {
    const query = {

      text: `SELECT pseudo,password,insee FROM admin 
             WHERE 
             pseudo = $1 AND password = $2 AND insee = $3`,
      values: [object.pseudo, object.password, object.insee],
    };
    const data = await client.query(query);
    return data.rows[0];
  },
};

module.exports = datamapper;
