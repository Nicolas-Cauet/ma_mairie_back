const client = require(`../models/dbClient`);
const stringSimilarity = require(`string-similarity`);
const leoProfanity = require(`leo-profanity`);
const frenchBadwordsList = require(`french-badwords-list`);
const HandleError = require(`../handlers/handleError`);

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
  || req.socket.remoteAddress;
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
      text: `SELECT COUNT(*) FROM reporting WHERE user_ip = $1 AND town_hall_id = $2 AND CAST(created_at AS DATE) = CAST(NOW() AS DATE)`,
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
    if (verifyIp >= 3) {
      throw new HandleError(`Vous avez atteint la limite de 3 signalements par jour.`);
    } else if (noBadWords === true) {
      throw new HandleError(`Les insultes ne sont pas acceptées dans le texte du signalement.`);
    } else if (noBadTitle === true) {
      throw new HandleError(`Les insultes ne sont pas acceptées dans le titre du signalement.`);
    } else {
      const query = {
        text: `SELECT user_text FROM reporting WHERE town_hall_id = $1 AND CAST(created_at AS DATE) = CAST(NOW() AS DATE)`,
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
        throw new HandleError(`Le contenu du signalement est très similaire a un autre signalement`);
      } else {
        next();
      }
    }
  },
};

module.exports = compareString;
