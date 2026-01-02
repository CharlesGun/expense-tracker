module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        status: false,
        message: 'Validation error',
        errors: error.details.map(err => err.message)
      });
    }

    next();
  };
};
