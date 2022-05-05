require("dotenv").config();
const express = require("express");

const debug = require("debug")("APP");

const router = require("./app/routers/router");

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  debug(`Listening on http://localhost:${PORT}`);
});
