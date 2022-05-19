const joi = require(`joi`);

const schemaCreateCouncilMember = joi.object({
  last_name: joi.string().required().label(`Le Prénom est requis !`),
  first_name: joi.string().required().label(`Le Nom de famille est requis !`),
  role: joi.string().required().label(`Le Role est requis !`),
  photo: joi.string(),
  town_hall_id: joi.number().required(),
});

module.exports = schemaCreateCouncilMember;
