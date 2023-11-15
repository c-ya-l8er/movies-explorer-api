const SERVER_ERROR = require('../errors/ServerError');
const { SERVER_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (error, req, res, next) => {
  const statusCode = error.statusCode || SERVER_ERROR;
  const message = statusCode === SERVER_ERROR ? SERVER_ERROR_MESSAGE : error.message;
  res.status(statusCode).send({ message });
  next();
};
