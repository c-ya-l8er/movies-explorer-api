const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { default: isEmail } = require('validator/lib/isEmail');
const UNAUTHORIZED_ERROR = require('../errors/Unauthorized');
const { UNAUTHORIZED_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UNAUTHORIZED_ERROR(UNAUTHORIZED_MESSAGE),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UNAUTHORIZED_ERROR(UNAUTHORIZED_MESSAGE),
          );
        }
        return user;
      });
    });
};
module.exports = mongoose.model('user', userSchema);
