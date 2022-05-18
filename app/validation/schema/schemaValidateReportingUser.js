/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
const joi = require(`joi`);

const schemaValidateReportingUser = joi
  .object({
    admin_text: joi.string().min(10).required(),
    reporting_statut: joi.string().required(),
  });

module.exports = schemaValidateReportingUser;
