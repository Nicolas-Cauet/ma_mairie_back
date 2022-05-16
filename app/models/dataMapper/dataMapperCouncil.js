const client = require(`../dbClient`);

const dataMapperCouncil = {
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
      text: `SELECT * FROM town_hall_staff WHERE id = $1`,
      values: [townHallId],
    };
    const data = await client.query(query);
    return data.row;
  },
};

module.exports = dataMapperCouncil;
