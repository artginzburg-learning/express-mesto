const validator = require('validator');

const validate = {
  URL: {
    validator: validator.isURL,
    message: 'Не похоже на ссылку',
  },
  email: {
    validator: validator.isEmail,
    message: 'Что-то не так с почтовым адресом',
  },
};

module.exports = validate;
