const debug = require(`debug`)(`validation`);

const validationModule = {
  validateCreateAdmin(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        if (
          error.message === `"password" with value "${req.body.password}" fails to match the required pattern: /^([a-zA-Z0-9@*#!?]{8,15})$/`
        ) {
          const err = new Error(
            `Le mot de passe doit contenir une majuscule un caractère spécial est au minimum 8 caractères et maximum 15 caractères les chiffres sont autorisés.`,
          );
          err.status = 406;
          next(err);
        } else if (
          error.message === `"email" must be a valid email`
        ) {
          const err = new Error(
            `L'adresse e-mail doit être conforme ex: test@gmail.fr`,
          );
          err.status = 406;
          next(err);
        } else if (
          error.message === `Cannot read properties of undefined (reading 'town_hall_id')`
        ) {
          const err = new Error(
            `Le code insee est invalide !`,
          );
          err.status = `HELLO`;
          next(err);
        }
      }
      next();
    };
  },
  validateCreateReportingUser(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        const err = new Error(error);
        err.status = 406;
        next(err);
      }
      next();
    };
  },
};

module.exports = validationModule;
