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
          err.status = 400;
          next(err);
        } else if (error.message === `"email" must be a valid email`) {
          const err = new Error(
            `L'adresse e-mail doit être conforme ex: test@gmail.fr.`,
          );
          err.status = 400;
          next(err);
        } else if (error.message === `"length must be less than or equal to 10 characters long"`) {
          const err = new Error(
            `Le numéro de téléphone doit contenir au minimum 10 caractères est maximum 10 caractères .`,
          );
          err.status = 400;
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
        const err = new Error(error.message);
        err.status = 400;
        next(err);
      }
      next();
    };
  },
  validateReportingUser(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (
        error.message === `"admin_text" length must be at least 10 characters long`
      ) {
        const err = new Error(
          `Le texte de administrateur doit contenir une réponse d'au moins 10 caractères.`,
        );
        err.status = 400;
        next(err);
      } else if (error.message === `"length must be at least 5 characters long"`) {
        const err = new Error(
          `Le titre doit contenir au moins 5 caractères.`,
        );
        err.status = 400;
        next(err);
      }
      next();
    };
  },
  validateCreateArticle(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        const err = new Error(error.message);
        err.status = 400;
        next(err);
      }
      next();
    };
  },
  validateUpdateArticle(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        const err = new Error(error.message);
        err.status = 400;
        next(err);
      }
      next();
    };
  },
  validateCreateCouncilMember(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        const err = new Error(error.message);
        err.status = 400;
        next(err);
      }
      next();
    };
  },
  validateUpdateCouncilMember(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        const err = new Error(error.message);
        err.status = 400;
        next(err);
      }
      next();
    };
  },
};

module.exports = validationModule;
