const mongoose = require("mongoose");

const validateUrl = require("./helpers/validateUrl");
const defaultLengthConstrained = require("./helpers/defaultLengthConstrained");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:
      "Имя должно быть у каждого пользователя (Пупкин Василий Иванович тоже сойдёт)",
    ...defaultLengthConstrained,
  },
  about: {
    type: String,
    required: "Не одежда, а добротное описание человека красит",
    ...defaultLengthConstrained,
  },
  avatar: {
    type: String,
    required: "Извините, но мы встречаем по одёжке",
    validate: validateUrl,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
