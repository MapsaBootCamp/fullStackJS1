const { validationResult } = require("express-validator");

function checkError(req, res, next) {
  const validationError = validationResult(req);
  if (validationError.errors.length > 0) {
    return res.status(400).json({
      error: true,
      message: validationError,
    });
  }
  next();
}

module.exports = checkError;
