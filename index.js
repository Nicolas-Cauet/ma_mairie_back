require(`dotenv`).config();
const express = require(`express`);
const debug = require(`debug`)(`APP`);
const session = require(`express-session`);
const router = require(`./app/routers/router`);

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://mamairie.fr-cork.surge.sh/');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});
app.use(session({
  secret: `keyboard cat`,
  cookie: {},
}));
app.use(express.urlencoded({ extended: true }));

const sessions = [];

app.use(router);

app.listen(PORT, () => {
  debug(`Listening on https://localhost:${PORT} `);
});

