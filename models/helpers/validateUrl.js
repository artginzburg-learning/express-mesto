const regUrl =
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

const validateUrl = {
  validator: regUrl.test,
  message: "Не похоже на ссылку",
};

module.exports = validateUrl;
