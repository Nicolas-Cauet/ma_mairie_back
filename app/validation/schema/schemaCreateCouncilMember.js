const joi = require(`joi`);

const schemaCreateCouncilMember = joi.object({
  last_name: joi.string().required().error(new Error(`Le Prénom est requis !`)),
  first_name: joi.string().required().error(new Error(`Le Nom de famille est requis !`)),
  role: joi.string().required().error(new Error(`Le Role est requis !`)),
  photo: joi.string(),
  town_hall_id: joi.number().required(),
}).required().min(4);

module.exports = schemaCreateCouncilMember;
