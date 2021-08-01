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
  codes: {
    badRequest: 400,
    notFound: 404,
    serverError: 500,
  },
};

module.exports = errors;
