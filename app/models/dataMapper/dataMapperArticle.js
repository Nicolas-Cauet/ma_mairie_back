const client = require(`../dbClient`);

const dataMapperArticle = {

  async getAllArticle(townHallId) {
    const query = {
      text: `SELECT * FROM reporting
                    WHERE town_hall_id = $1;`,
      values: [townHallId],
    };
    const data = await client.query(query);
    return data.rows;
  },
};

module.exports = dataMapperArticle;
