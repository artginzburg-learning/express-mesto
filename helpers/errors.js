const errors = {
  names: {
    cast: 'CastError',
    validation: 'ValidationError',
  },
  messages: {
    default: 'Ошибка обработки запроса',
    castError: 'Запрашиваемый ресурс не найден',
    validationError: 'Переданы некорректные данные',
    forbiddenError: 'Недостаточно прав',
    unauthorizedError: 'Необходима авторизация',
  },
};

module.exports = errors;
