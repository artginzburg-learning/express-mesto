const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const errors = require('../helpers/errors');
const { StatusCodes } = require('../helpers/StatusCodes');

const { JWT_SECRET } = require('../helpers/constants');

const options = {
  runValidators: true,
  new: true,
};

module.exports.getUsers = (req, res) => User.find({})
  .then((data) => res.send({ data }))
  .catch(() => res
    .status(StatusCodes.internalServerError)
    .send({ message: errors.messages.default }));

module.exports.getCurrentUser = (req, res) => User.findById(req.user._id)
  .then((data) => (data
    ? res.send({ data })
    : res
      .status(StatusCodes.notFound)
      .send({ message: errors.messages.castError })))
  .catch((err) => (err.name === errors.names.cast
    ? res
      .status(StatusCodes.badRequest)
      .send({ message: errors.messages.castError })
    : res
      .status(StatusCodes.internalServerError)
      .send({ message: errors.messages.default })));

module.exports.findUser = (req, res) => User.findById(req.params.id)
  .then((data) => (data
    ? res.send({ data })
    : res
      .status(StatusCodes.notFound)
      .send({ message: errors.messages.castError })))
  .catch((err) => (err.name === errors.names.cast
    ? res
      .status(StatusCodes.badRequest)
      .send({ message: errors.messages.castError })
    : res
      .status(StatusCodes.internalServerError)
      .send({ message: errors.messages.default })));

module.exports.createUser = (req, res) => bcrypt.hash(req.body.password, 10)
  .then((hash) => User.create({
    email: req.body.email,
    password: hash,
  }))
  .then((data) => res.status(StatusCodes.created).send({ data }))
  .catch((err) => (err.name === errors.names.validation
    ? res
      .status(StatusCodes.badRequest)
      .send({ message: errors.messages.validationError })
    : res
      .status(StatusCodes.internalServerError)
      .send({ message: errors.messages.default })));

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((data) => (data
      ? res.send({ data })
      : res
        .status(StatusCodes.notFound)
        .send({ message: errors.messages.castError })))
    .catch((err) => {
      if (err.name === errors.names.validation) {
        return res
          .status(StatusCodes.badRequest)
          .send({ message: errors.messages.validationError });
      }
      return err.name === errors.names.cast
        ? res
          .status(StatusCodes.badRequest)
          .send({ message: errors.messages.castError })
        : res
          .status(StatusCodes.internalServerError)
          .send({ message: errors.messages.default });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((data) => (data
      ? res.send({ data })
      : res
        .status(StatusCodes.notFound)
        .send({ message: errors.messages.castError })))
    .catch((err) => {
      if (err.name === errors.names.validation) {
        return res
          .status(StatusCodes.badRequest)
          .send({ message: errors.messages.validationError });
      }
      return err.name === errors.names.cast
        ? res
          .status(StatusCodes.badRequest)
          .send({ message: errors.messages.castError })
        : res
          .status(StatusCodes.internalServerError)
          .send({ message: errors.messages.default });
    });
};

const tokenExpiration = { days: 7 };
tokenExpiration.sec = 60 * 60 * 24 * tokenExpiration.days;
tokenExpiration.ms = 1000 * tokenExpiration.sec;

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: tokenExpiration.sec });

      res
        .cookie('jwt', token, {
          maxAge: tokenExpiration.ms,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch((err) => {
      res
        .status(StatusCodes.unauthorized)
        .send({ message: err.message });
    });
};
