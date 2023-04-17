const joi = require(`joi`);

const schemaValidateReportingUser = joi.object({
  admin_text: joi.string().min(10).required().error(new Error(`le texte de l'administrateur est requis ! et doit faire minimum 10 caratères de long.`)),
  reporting_statut: joi.string().required().error(new Error(`le statut du signalement est requis !`)),
  title: joi.string(),
});
module.exports = schemaValidateReportingUser;
