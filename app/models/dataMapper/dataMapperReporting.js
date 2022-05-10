const client = require(`../dbClient`);
const debug = require(`debug`)(`dataMapperReporting`);

const dataMapperReporting = {
  async allReport(townHallId) {
    const query = {
      text: `SELECT * FROM reporting
            WHERE town_hall_id = $1;`,
      values: [townHallId],
    };
    debug(query);
    const data = await client.query(query);
    return data.rows[0];
  },
};

module.exports = dataMapperReporting;
