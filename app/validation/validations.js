const APIError = require(`../handlers/APIError`);

const validationModule = {
  validateCreateAdmin(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new APIError(error);
      }
      next();
    };
  },
  validateCreateReportingUser(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new APIError(error);
      }
      next();
    };
  },
};

module.exports = validationModule;
