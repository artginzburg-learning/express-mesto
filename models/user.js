const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const stringWithConstrainedLength = require('./helpers/stringWithConstrainedLength');
const validate = require('./helpers/validate');

const userSchema = new mongoose.Schema(
  {
    name: {
      ...stringWithConstrainedLength,
      default: 'Jacques-Yves Cousteau',
    },
    about: {
      ...stringWithConstrainedLength,
      default: 'Ocean explorer',
    },
    avatar: {
      type: String,
      default: '',
      validate: validate.URL,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validate.email,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { versionKey: false },
);

const rejectInvalidCredentials = () => Promise.reject(new Error('Неправильные почта или пароль'));

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, pass) {
  return this.findOne({ email })
    .then(({ password, ...user }) => {
      if (!user) {
        return rejectInvalidCredentials;
      }

      return bcrypt.compare(pass, password)
        .then((matched) => {
          if (!matched) {
            return rejectInvalidCredentials;
          }

          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
