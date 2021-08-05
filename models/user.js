const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const stringWithConstrainedLength = require('./helpers/stringWithConstrainedLength');
const validateUrl = require('./helpers/validateUrl');

const userSchema = new mongoose.Schema(
  {
    name: {
      ...stringWithConstrainedLength,
      required:
        'Имя должно быть у каждого пользователя (Пупкин Василий Иванович тоже сойдёт)',
    },
    about: {
      ...stringWithConstrainedLength,
      required: 'Не одежда, а добротное описание человека красит',
    },
    avatar: {
      type: String,
      required: 'Извините, но мы встречаем по одёжке',
      validate: validateUrl,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
