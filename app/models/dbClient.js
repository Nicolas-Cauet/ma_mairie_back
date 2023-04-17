require(`dotenv`).config();

const { Pool } = require(`pg`);

/**
 * The method allows to establish the connection to the database
 * @type{Object} object
 * @namespace client
 * @export client
 * @class Pool
 */
// const client = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { // on demande d'accepter le fait qu'on ne soit pas en ssl (sécurité)
//     rejectUnauthorized: false,
//   },
// });

// Local conenxion

const client = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

client.connect();

module.exports = client;
