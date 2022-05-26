const joi = require(`joi`);

const schemaValidateReportingUser = joi.object({
  admin_text: joi.string().min(10).required().label(`le texte de l'administrateur est requis !`),
  reporting_statut: joi.string().required().label(`le statut du signalement est requis !`),
}).required().min(2);

module.exports = schemaValidateReportingUser;
