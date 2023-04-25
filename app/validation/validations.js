const HandleError = require(`../handlers/handleError`);
// const debug = require(`debug`)(`VALIDATION`);

const validationModule = {
  validateSchema(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new HandleError(error.message, 400);
      }
      next();
    };
  },
};

module.exports = validationModule;
