const APIError = require(`../handlers/APIError`);
const client = require(`../models/dbClient`);
const stringSimilarity = require(`string-similarity`);
const debug = require(`debug`)(`compareString`);
const leoProfanity = require(`leo-profanity`);
const frenchBadwordsList = require(`french-badwords-list`);

leoProfanity.clearList();
leoProfanity.add(frenchBadwordsList.array);

/**
 * @type {object}
 * @export compareString
 * @namespace compareString
 */
const compareString = {
  /**
   * @menberof compareString
   * @method getIp
   * @param {Object} req
   * @returns {VoidFunction}
   */
  async getIp(req) {
    const ip = req.headers[`x-forwarded-for`]?.split(`,`).shift()
  || req.socket?.remoteAddress;
    return ip;
  },
  async verifyIp(ip, req) {
    const id = req.params.town_hall_id;
    const query = {
      text: `SELECT COUNT(*) FROM reporting WHERE user_ip = $1 AND town_hall_id = $2 AND created_at > CAST(NOW() AS DATE) - 1`,
      values: [ip, id],
    };
    const result = await client.query(query);
    return result;
  },
  async verifyString(req, res, next) {
    console.log(req.body);
    const stringUser = req.body.user_text;
    const id = req.params.town_hall_id;
    const noBadWords = leoProfanity.check(stringUser);
    const ip = compareString.getIp(req);
    const verifyIp = compareString.verifyIp(ip, req);

    if (verifyIp > 3) {
      throw new APIError(`Vous avez deja poster 3 fois aujourd'hui`);
    } else if (noBadWords === true) {
      throw new APIError(`Les insultes ne sont pas accepter`);
    } else {
      const query = {
        text: `SELECT user_text FROM reporting WHERE town_hall_id = $1 AND created_at > CAST(NOW() AS DATE) - 1`,
        values: [id],
      };
      const allUserText = await client.query(query);

      const AllUserTextString = [` `];

      // eslint-disable-next-line no-restricted-syntax
      for (const rows of allUserText.rows) {
        AllUserTextString.push(rows.user_text);
      }
      const matches = stringSimilarity.findBestMatch(stringUser, AllUserTextString);
      if (matches.bestMatch.rating > 0.8) {
        throw new APIError(`Le contenu du signalement est très similaire a un autre signalement`);
      } else {
        next();
      }
    }
  },
};

module.exports = compareString;
