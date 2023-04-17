const HandleError = require(`../handlers/handleError`);
const debug = require(`debug`)(`VALIDATION`);

const validationModule = {
  validateCreateAdmin(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new HandleError(error.message, 400);
      }
      next();
    };
  },
  validateCreateReportingUser(schema) {
    return (req, _, next) => {
      debug(req.body);
      const { error } = schema.validate(req.body);
      if (error) {
        throw new HandleError(error.message, 400);
      }
      next();
    };
  },
  validateReportingUser(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new HandleError(error.message, 400);
      }
      next();
    };
  },
  validateCreateArticle(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new HandleError(error.message, 400);
      }
      next();
    };
  },
  validateUpdateArticle(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new HandleError(error.message, 400);
      }
      next();
    };
  },
  validateCreateCouncilMember(schema) {
    return (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new HandleError(error.message, 400);
      }
      next();
    };
  },
  validateUpdateCouncilMember(schema) {
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
