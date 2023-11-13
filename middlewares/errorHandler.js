const { SERVER_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? SERVER_ERROR_MESSAGE : error.message;
  res.status(statusCode).send({ message });
  next();
};
