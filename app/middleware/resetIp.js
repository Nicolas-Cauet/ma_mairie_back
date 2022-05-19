const cron = require('node-cron');
const client = require('../models/dbClient')
cron.schedule('59 23 * * *', async () => {
    const query = {
        text : `UPDATE reporting
                SET user_ip= '$1'
                WHERE created_at < CAST(NOW() AS DATE) - 1 AND user_ip != '$2'`,
        values : ['null', 'null']
    }
    await client.query(query);
})