/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
const joi = require(`joi`);

const schemaCreateAdmin = joi
  .object({
    pseudo: joi.string().min(3).max(20),
    email: joi.string().email(new RegExp(`^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$`)),
    password: joi.string().pattern(new RegExp(`^([a-zA-Z0-9@*#!?]{8,15})$`)),
    insee: joi.string().min(5),
  }).required().min(4);

module.exports = schemaCreateAdmin;
