const APIError = require(`../handlers/APIError`);

const validationModule = {
  validateCreateAdmin(schema) {
    return (req, _, next) => {
      console.log(schema.validate(req.body));
      const { error } = schema.validate(req.body);
      if (error) {
        throw new APIError(error).send(error.message);
      }
      next();
    };
  },
};

module.exports = validationModule;
