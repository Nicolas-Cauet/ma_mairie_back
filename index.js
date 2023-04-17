require(`dotenv`).config();
const debug = require(`debug`)(`SERVER`);
const cors = require(`cors`);
const PORT = process.env.PORT || 3333;
const express = require(`express`);
const router = require(`./app/routers/router`);
// const handleError = require(`./app/handlers/handleError`);
const deleteIp = require(`./app/middleware/deleteIp`);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allowedOrigins = [`http://localhost:3000`, `http://locahost:5000`];

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true); if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not `
                + `allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    } return callback(null, true);
  },
}));
app.use(router);
app.use(express.static(`docs`));
app.use(deleteIp.deleteIp);

app.use((err, _, res, next) => {
  res.status(err.status).json(err.message);
  next();
});

app.listen(PORT, () => {
  debug(`Listening on http://localhost:${PORT} `);
});
