const APIError = require(`../handlers/APIError`);
const client = require(`../models/dbClient`);
const stringSimilarity = require(`string-similarity`);
const debug = require(`debug`)(`compareString.js`);

const compareString = {
  async verifyString(req, res, next) {
    const stringUser = req.body.user_text;
    const id = req.params.town_hall_id;

    const query = {
      text: `SELECT user_text FROM reporting WHERE town_hall_id = $1`,
      values: [id],
    };
    const allUserText = await client.query(query);
    //console.log(allUserText.rows);
    const result = rows => rows.user_text
    console.log(result);
    const AllUserTextString = [` `];

    for (const rows of allUserText.rows) {
      // console.log(rows[0]);
      AllUserTextString.push(rows);
    }
    const matches = stringSimilarity.findBestMatch(stringUser, AllUserTextString);
    if (matches.bestMatch.rating > 0.8) {
      throw new APIError(`Le contenu du signalement est très similaire a un autre signalement`);
    } else {
      next();
    }
  },
};

module.exports = compareString;
