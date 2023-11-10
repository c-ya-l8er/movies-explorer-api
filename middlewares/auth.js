const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const UNAUTHORIZED = require('../errors/Unauthorized');

const handleAuthError = (next) => {
  next(new UNAUTHORIZED('Необходима авторизация'));
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(next);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return handleAuthError(next);
  }

  req.user = payload;

  return next();
};
