const APIError = require(`../handlers/APIError`);

const validationModule = {
  validateCreateAdmin(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new APIError(`Schema non respecter !`, error);
      }
      next();
    };
  },
  validateCreateReportingUser(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        console.log(error);
        throw new APIError(`Schema non respecter !`);
      }
      next();
    };
  },
};

module.exports = validationModule;
