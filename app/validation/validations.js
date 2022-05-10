const APIError = require(`../handlers/APIError`);

const validationModule = {
  validateCreateAdmin(schema) {
    return (req, _, next) => {
      console.log(req.body);
      const { error } = schema.validate(req.body);
      if (error) {
        throw new APIError(error);
      }
      next();
    };
  },
};

module.exports = validationModule;
