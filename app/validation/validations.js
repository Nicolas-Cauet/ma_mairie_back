const validationModule = {
  validateCreateAdmin(schema) {
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
