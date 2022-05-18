const client = require(`../dbClient`);

/**
 * @type {Object}
 * @exports dataMapperCouncil
 * @namespace dataMapperCouncil
 */
const dataMapperCouncil = {
  /**
   * @menberof dataMapperCouncil
   * @method getAllCouncil
   * @param {Number} townHallId
   * @returns {Array} Return all councilors
   */
  async getAllCouncil(townHallId) {
    const query = {
      text: `SELECT * FROM town_hall_staff WHERE town_hall__id = $1`,
      values: [townHallId],
    };
    const data = await client.query(query);
    return data.rows;
  },
  async postMemberCouncil(object) {
    const query = {
      text: `INSERT INTO town_hall_staff(last_name, first_name, role, town_hall_id)
            VALUES($1, $2, $3, $4)`,
      values: [object.lastName, object.firstName, object.role, object.townHallId],
    }
    const data = await client.query(query);
    return data;
  },
  async deleteMember(id) {
    const query = {
      text: `DELETE FROM town_hall_staff
            WHERE town_hall_staff_id = $1`,
      values: [id],
    };
    const data = await client.query(query);
    return data;
  },
  async modifyCouncil(object) {
    const query = {
      text: `UPDATE reporting
      SET last_name = $1, first_name = $2, role = $3, 
      WHERE town_hall_id = $4; `,
      // eslint-disable-next-line max-len
      values: [object.lastName, object.firstName, object.role, object.townHallId],
    };
    const data = await client.query(query);
    return data;
  },
};

module.exports = dataMapperCouncil;
