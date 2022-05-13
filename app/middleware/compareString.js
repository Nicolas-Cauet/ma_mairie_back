const APIError = require(`../handlers/APIError`);
const client = require(`../models/dbClient`);
const stringSimilarity = require(`string-similarity`);
const debug = require(`debug`)(`compareString`);

const compareString = {
  async verifyString(req, res, next) {
    const stringUser = req.body.user_text;
    console.log(stringUser);
    const id = req.params.town_hall_id;

    const query = {
      text: `SELECT user_text FROM reporting WHERE town_hall_id = $1 AND created_at > CAST(NOW() AS DATE) - 1 `,
      values: [id],
    };
    const allUserText = await client.query(query);

    const AllUserTextString = [` `];

    // eslint-disable-next-line no-restricted-syntax
    for (const rows of allUserText.rows) {
      AllUserTextString.push(rows.user_text);
    }
    const matches = stringSimilarity.findBestMatch(stringUser, AllUserTextString);
    console.log(matches);
    if (matches.bestMatch.rating > 0.8) {
      throw new APIError(`Le contenu du signalement est très similaire a un autre signalement`);
    } else {
      next();
    }
  },
};

module.exports = compareString;
