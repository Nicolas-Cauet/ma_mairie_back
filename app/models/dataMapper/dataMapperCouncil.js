const client = require(`../dbClient`);

<<<<<<< HEAD
const dataMapperCouncil = {
=======
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
>>>>>>> 5853bdf2793af3884d53a2c28032ce5236f62d86
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
