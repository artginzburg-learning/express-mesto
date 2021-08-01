const mongoose = require('mongoose');

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
  },
  { versionKey: false },
);

const User = mongoose.model('user', userSchema);

module.exports = User;
