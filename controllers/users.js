const { ValidationError, CastError } = require('mongoose').Error;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const statusCodes = require('../utils/constants').HTTP_STATUS;
const NOT_FOUND = require('../errors/NotFound');
const BAD_REQUEST = require('../errors/BadRequest');
const CONFLICT = require('../errors/Conflict');
const { JWT_SECRET } = require('../utils/config');

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NOT_FOUND('NotFound'))
    .then((user) => res.status(statusCodes.OK).send(user))
    .catch((error) => {
      if (error instanceof CastError) {
        return next(new BAD_REQUEST('Передан не валидный id'));
      }
      return next(error);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(statusCodes.CREATED).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return next(new BAD_REQUEST('Переданы некорректные данные при создании пользователя'));
      }
      if (error.code === 11000) {
        return next(new CONFLICT('Пользователь пытается использовать существующий в базе email'));
      }
      return next(error);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { email, name }, { new: true, runValidators: true })
    .orFail(new NOT_FOUND('NotFound'))
    .then((user) => res.status(statusCodes.OK).send(user))
    .catch((error) => {
      if (error instanceof CastError) {
        return next(new BAD_REQUEST('Переданы некорректные данные при обновлении профиля'));
      }
      if (error.code === 11000) {
        return next(new CONFLICT('Пользователь пытается использовать существующий в базе email'));
      }
      return next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.status(200).send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: '7d',
        }),
      });
    })
    .catch(next);
};
