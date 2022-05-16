/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
const joi = require(`joi`);

const schemaValidateReporting = joi
  .object({
    pseudo: joi.string().min(3).max(20),
    email: joi.string().email(),
    password: joi.string().pattern(new RegExp(`^([a-zA-Z0-9@*#!?]{8,15})$`)),
    insee: joi.string().min(5),
  })
  .required()
  .min(4);

module.exports = schemaValidateReporting;
