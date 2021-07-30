const mongoose = require("mongoose");
const validateUrl = require("./helpers/validateUrl");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:
      "Имя должно быть у каждого пользователя (Пупкин Василий Иванович тоже сойдёт)",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: "Не одежда, а добротное описание человека красит",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: "Извините, но мы встречаем по одёжке",
    validate: validateUrl,
  },
});

userSchema.pre("save", function (error, doc, next) {
  if (error.name === "DocumentNotFoundError") {
    next(new Error(404));
  } else {
    next();
  }
});

module.exports = mongoose.model("user", userSchema);
