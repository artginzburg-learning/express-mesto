const errors = {
  names: {
    cast: 'CastError',
    validation: 'ValidationError',
  },
  messages: {
    default: 'Ошибка обработки запроса',
    castError: 'Запрашиваемый ресурс не найден',
    validationError: 'Переданы некорректные данные',
  },
};

module.exports = errors;
