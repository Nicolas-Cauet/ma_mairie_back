const client = require(`../models/dbClient`);
const stringSimilarity = require(`string-similarity`);
const leoProfanity = require(`leo-profanity`);
const frenchBadwordsList = require(`french-badwords-list`);

leoProfanity.clearList();
leoProfanity.add(frenchBadwordsList.array);

/**
 * object contains methods to filter reports
 * @type {object}
 * @export compareString
 * @namespace compareString
 */
const compareString = {
  /**
   * la method permet de récupérer adresse ip
   * @menberof compareString
   * @method getIp
   * @param {Object} req
   * @returns {String} string
   */
  async getIp(req) {
    const ip = req.headers[`x-forwarded-for`]?.split(`,`).shift()
  || req.socket?.remoteAddress;
    return ip;
  },
  /**
   * the method allows you to check if ip address
   * has already been stored for a user report
   * @menberof compareString
   * @method verifyIp
   * @param {String} ip
   * @param {Object} req
   * @returns {Number} Number
   */
  async verifyIp(ip, req) {
    const id = parseInt(req.params.town_hall_id, 10);
    const query = {
      text: `SELECT COUNT(*) FROM reporting WHERE user_ip = $1 AND town_hall_id = $2 AND created_at > CAST(NOW() AS DATE) - 1`,
      values: [ip, id],
    };
    const result = await client.query(query);
    return Number(result.rows[0].count);
  },
  /**
   * The method makes it possible to check whether the text,
   * of the report has not already been posted. If the person
   * whose ip has already reported more than
   * 3 times a day and if the report does not contain an insult
   * @menberof compareString
   * @method verifyString
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns void
   */
  async verifyString(req, res, next) {
    const { title } = req.body;
    const stringUser = req.body.user_text;
    const id = req.params.town_hall_id;
    const noBadWords = leoProfanity.check(stringUser);
    const noBadTitle = leoProfanity.check(title);
    const ip = await compareString.getIp(req);
    const verifyIp = await compareString.verifyIp(ip, req);
    if (verifyIp >= 2) {
      const err = new Error(`Vous avez deja poster 3 fois aujourd'hui`);
      next(err);
    } else if (noBadWords === true) {
      const err = new Error(`Les insultes ne sont pas acceptées dans le texte du signalement.`);
      next(err);
    } else if (noBadTitle === true) {
      const err = new Error(`Les insultes ne sont pas acceptées dans le titre du signalement.`);
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
