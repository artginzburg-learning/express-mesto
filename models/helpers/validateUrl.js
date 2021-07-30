const regUrl =
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

const urlValidator = (val) => regUrl.test(val);

const validateUrl = {
  validator: urlValidator,
  message: "Не похоже на ссылку",
};

module.exports = validateUrl;
