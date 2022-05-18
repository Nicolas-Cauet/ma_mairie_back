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
      text: `SELECT * FROM town_hall_staff WHERE town_hall_staff_id = $1`,
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
      SET title = $1, user_image = $2, user_text = $3, admin_text = $4, admin_image = $5, reporting_category = $6, reporting_statut = $7
      WHERE reporting_id = $8; `,
      // eslint-disable-next-line max-len
      values: [
        object.title,
        object.user_image,
        object.user_text,
      ],
    };
    const data = await client.query(query);
    return data;
  },
};

module.exports = dataMapperCouncil;
