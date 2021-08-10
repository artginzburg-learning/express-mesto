const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors/classes');
const { JWT_SECRET } = require('../helpers/constants');

const tokenPrefix = 'Bearer ';

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization || !authorization.startsWith(tokenPrefix)) {
    throw new UnauthorizedError();
  }

  const token = authorization.substring(tokenPrefix.length);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError();
  }

  req.user = payload;

  return next();
};
