/* eslint-disable newline-per-chained-call */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
const joi = require(`joi`);

const schemaCreateReportingUser = joi.object({
  reporting_category: joi.string().label(`la categorie du signalement est requise !`).required(),
  title: joi.string().min(5).max(30).label(`le titre du signalement est requis !`).required(),
  user_text: joi.string().label(`le texte du signalement est requis !`).required(),
  email: joi.string().email().label(`Votre email dans le signalement est requis !`).required(),
  first_name: joi.string().required().max(20).label(`le Prénom dans le signalement est requis !`),
  last_name: joi.string().required().max(20).label(`le Nom de famille dans le signalement est requis !`),
  phonenumber: joi.string().min(10).max(10).allow(``),
  town_hall_id: joi.number(),
}).required().min(5);

module.exports = schemaCreateReportingUser;
