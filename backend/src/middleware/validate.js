const AppError = require("../utils/AppError");

const validate = (schema, property = "body") => (req, res, next) => {
  const { value, error } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const details = error.details.map((item) => ({
      field: item.path.join("."),
      message: item.message
    }));
    return next(new AppError("Validation failed", 422, details));
  }

  req[property] = value;
  next();
};

module.exports = validate;
