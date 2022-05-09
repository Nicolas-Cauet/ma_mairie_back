require(`dotenv`).config();
const express = require(`express`);
const debug = require(`debug`)(`APP`);
const session = require(`express-session`);
const router = require(`./app/routers/router`);
const cors = require(`cors`);

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
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
