const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const errors = require('../helpers/errors');
const { StatusCodes } = require('../helpers/StatusCodes');

const { NODE_ENV, JWT_SECRET } = process.env;

const options = {
  runValidators: true,
  new: true,
};

module.exports.getUsers = (req, res) => User.find({})
  .then((data) => res.send({ data }))
  .catch(() => res
    .status(StatusCodes.internalServerError)
    .send({ message: errors.messages.default }));

module.exports.getCurrentUser = (req, res) => User.findById(req.user._id).select('-password')
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

module.exports.findUser = (req, res) => User.findById(req.params.id).select('-password')
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
  }).select('-password'))
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

  User.findByIdAndUpdate(req.user._id, { name, about }, options).select('-password')
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

  User.findByIdAndUpdate(req.user._id, { avatar }, options).select('-password')
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-dev-secret', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((err) => {
      res
        .status(StatusCodes.unauthorized)
        .send({ message: err.message });
    });
};
