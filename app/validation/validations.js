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
      console.log(req.body);
      console.log(schema);
      console.log(schema.validate(req.body));
      const { error } = schema.validate(req.body);
      if (error) {
        throw new APIError(`Schema non respecter !`, error);
      }
      next();
    };
  },
};

module.exports = validationModule;
