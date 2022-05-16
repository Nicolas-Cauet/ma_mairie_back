const client = require(`../dbClient`);

const dataMapperCouncil = {
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
