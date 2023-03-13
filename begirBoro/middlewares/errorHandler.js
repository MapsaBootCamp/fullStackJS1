function errorHandler(error, req, res, next) {
  if (error.status === 406) {
    res.status(error.status).send(error.message).end();
  } else if (error.status || error.statusCode) {
    res
      .status(error.status || error.statusCode)
      .send({ error: error.name || error.error, message: error.message })
      .end();
  } else {
    return next(error);
  }
}

module.exports = errorHandler;
