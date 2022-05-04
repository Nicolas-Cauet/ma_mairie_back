require('dotenv').config();
const express = require('express');

const router = require('./app/routers/router.js');

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
    console.log('Listening on http://localhost:' + PORT);
});
