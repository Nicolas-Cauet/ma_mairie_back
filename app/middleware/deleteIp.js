const cron = require('node-cron');
const client = require('../models/dbClient')


/**
 * @type {object}
 * @export DeleteIp
 * @namespace DeleteIp
 */
const DeleteIp = {
      /** this method uses cron to schedule it calls the database every day to check the 30-day ips
   * @menberof deleteIp
   * @method deleteIp
   */
    deleteIp() {
        cron.schedule('59 23 * * *', async () => {
            const query = {
                text : `UPDATE reporting
                        SET user_ip= '$1'
                        WHERE created_at < CAST(NOW() AS DATE) - 1 AND user_ip != '$2'`,
                values : ['null', 'null']
            }
            await client.query(query);
        })
    }
    }

module.exports = DeleteIp;