require(`dotenv`).config();
const express = require(`express`);
const debug = require(`debug`)(`APP`);
const router = require(`./app/routers/router`);

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept');
  next();
});

app.use(router);

app.listen(PORT, () => {
  debug(`Listening on https://localhost:${PORT} `);
});
