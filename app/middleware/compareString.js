const client = require(`../models/dbClient`);
const stringSimilarity = require(`string-similarity`);
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
    const id = parseInt(req.params.town_hall_id, 10);
    const query = {
      text: `SELECT COUNT(*) FROM reporting WHERE user_ip = $1 AND town_hall_id = $2 AND created_at > CAST(NOW() AS DATE) - 1`,
      values: [ip, id],
    };
    const result = await client.query(query);
    return Number(result.rows[0].count);
  },
  async verifyString(req, res, next) {
    const stringUser = req.body.user_text;
    const id = req.params.town_hall_id;
    const noBadWords = leoProfanity.check(stringUser);
    const ip = await compareString.getIp(req);
    const verifyIp = await compareString.verifyIp(ip, req);
    if (verifyIp >= 100) {
      const err = new Error(`Vous avez deja poster 3 fois aujourd'hui`);
      next(err);
    } else if (noBadWords === true) {
      const err = new Error(`Les insultes ne sont pas accepter`);
      next(err);
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
        const err = new Error(`Le contenu du signalement est très similaire a un autre signalement`);
        next(err);
      } else {
        next();
      }
    }
  },
};

module.exports = compareString;
