/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
const joi = require(`joi`);

const schemaCreateAdmin = joi
  .object({
    pseudo: joi.string().min(3).max(20).error(new Error(`Le pseudo doit contenir minimum trois caractères et vingt caractères maximum`)),
    email: joi.string().email(new RegExp(`^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$`)).error(new Error(`l'adresse email respecter le schéma exemple@gmail.com`)),
    password: joi.string().pattern(new RegExp(`^([a-zA-Z0-9@*#!?]{8,15})$`)).error(new Error(`Le mot de passe doit faire entre huit et quinze caractères, il peut contenir une lettre majuscule, des caractères speciaux(#,*,@,?,!) ou des chiffres.`)),
    insee: joi.string().min(5).error(new Error(`Le code insee et composer de cinq chiffres minimum.`)),
  }).required().min(4);

module.exports = schemaCreateAdmin;
