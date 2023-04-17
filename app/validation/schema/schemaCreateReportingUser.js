/* eslint-disable newline-per-chained-call */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
const joi = require(`joi`);

const schemaCreateReportingUser = joi.object({
  reporting_category: joi.string().error(new Error(`la categorie du signalement est requise !`)).required(),
  title: joi.string().min(5).max(30).error(new Error(`le titre du signalement est requis et doit faire minimum cinq cractères et maximum trente caratères de long.`)).required(),
  user_text: joi.string().error(new Error(`le texte du signalement est requis !`)).required(),
  email: joi.string().email().error(new Error(`Votre email dans le signalement est requis !`)).required(),
  first_name: joi.string().required().max(20).error(new Error(`le Prénom dans le signalement est requis ! et doit faire maximum vingt caratères de long.`)),
  last_name: joi.string().required().max(20).error(new Error(`le Nom de famille dans le signalement est requis ! et doit faire maximum vingt caratères de long.`)),
  phonenumber: joi.string().min(10).max(10).allow(``).error(new Error(`Le numéro de téléphone doit être composé de 10 chiffres.`)),
  town_hall_id: joi.number(),
}).required().min(5);

module.exports = schemaCreateReportingUser;
