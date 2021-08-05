const jwt = require('jsonwebtoken');

const { StatusCodes } = require('../helpers/StatusCodes');

const { NODE_ENV, JWT_SECRET } = process.env;

const tokenPrefix = 'Bearer ';

const handleAuthError = (res) => res
  .status(StatusCodes.unauthorized)
  .send({ message: 'Необходима авторизация' });

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(tokenPrefix)) {
    return handleAuthError(res);
  }

  const token = authorization.substring(tokenPrefix.length);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-dev-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next();
};
