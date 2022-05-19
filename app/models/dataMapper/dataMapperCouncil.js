const client = require(`../dbClient`);

/**
 * @type {Object}
 * @exports dataMapperCouncil
 * @namespace dataMapperCouncil
 */
const dataMapperCouncil = {
  /**
   * The method allows to recover all the municipal councilors as visitor
   * @menberof dataMapperCouncil
   * @method getAllCouncil
   * @param {Number} townHallId
   * @returns {Array} Return all councilors
   */
  async getAllCouncil(townHallId) {
    const query = {
      text: `SELECT * FROM town_hall_staff WHERE town_hall_id = $1 ORDER BY town_hall_staff_id`,
      values: [townHallId],
    };
    const data = await client.query(query);
    return data.rows;
  },
  /**
   * The method allows to create a members of the municipal council as administrator
   * @menberof dataMapperCouncil
   * @method postMemberCouncil
   * @param {object} object
   * @returns {void} post one new council member into database
   */
  async postMemberCouncil(object) {
    const query = {
      text: `INSERT INTO town_hall_staff(last_name, first_name, role, photo, town_hall_id)
            VALUES($1, $2, $3, $4 ,$5)`,
      values: [object.lastName, object.firstName, object.role, object.photo, object.townHallId],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * The method allows to remove a member of the municipal council as administrator
   * @menberof dataMapperCouncil
   * @method deleteMember
   * @param {number} id
   * @returns {Array} delete a council member with id
   */
  async deleteMember(id) {
    const query = {
      text: `DELETE FROM town_hall_staff
            WHERE town_hall_staff_id = $1`,
      values: [id],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * The method allows to update the information of a municipal councilor as administrator
   * @menberof dataMapperCouncil
   * @method modifyCouncil
   * @param {object} object
   * @returns {Array} modify a member
   */
  async modifyCouncil(object) {
    const query = {
      text: `UPDATE town_hall_staff
      SET last_name = $1, first_name = $2, role = $3, photo = $4
      WHERE town_hall_staff_id = $5; `,
      // eslint-disable-next-line max-len
      values: [object.lastName, object.firstName, object.role, object.photo, object.townHallStaffId],
    };
    const data = await client.query(query);
    return data;
  },
};

module.exports = dataMapperCouncil;
