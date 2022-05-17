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
    console.log(data.rows);
    return data.rows;
  },
};

module.exports = dataMapperCouncil;
