const debug = require(`debug`)(`dataMapper`);

const client = require(`../dbClient`);

/**
 *@type {Object}
 *@export datamapper
 *@namespace datamapper
 */
const datamapper = {
/**
 * @menberof datamapper
 * @method getTownHallId
 * @params {object}
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
   * @params {object}
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
   * @method login
   * @params {object}
   * @return {object}
   */
  async userLogin(pseudo, insee) {
    const query = {

      text: `SELECT * FROM admin 
             WHERE 
             pseudo = $1 AND insee = $2;`,
      values: [pseudo, insee],
    };
    const data = await client.query(query);
    debug(`DATAMAPPER ======>${data.rows}`);
    return data.rows[0];
  },
  async getOneAdmin(pseudo, email) {
    const query = {
      text: `SELECT * FROM "admin" WHERE pseudo = $1 AND email = $2;`,
      values: [pseudo, email],
    };
    const data = await client.query(query);
    return data;
  },
  async getall(){
    const query = {
      text: `SELECT * FROM town_hall;`
    }
    const data = await client.query(query);
    return data.rows[0];
  }
};

module.exports = datamapper;
