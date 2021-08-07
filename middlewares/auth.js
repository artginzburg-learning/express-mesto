const jwt = require('jsonwebtoken');

const errors = require('../helpers/errors');
const { StatusCodes } = require('../helpers/StatusCodes');

const { JWT_SECRET } = require('../helpers/constants');

const tokenPrefix = 'Bearer ';

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization || !authorization.startsWith(tokenPrefix)) {
    return res
      .status(StatusCodes.forbidden)
      .send({ message: errors.messages.forbiddenError });
  }

  const token = authorization.substring(tokenPrefix.length);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(StatusCodes.unauthorized)
      .send({ message: errors.messages.unauthorizedError });
  }

  req.user = payload;

  return next();
};
