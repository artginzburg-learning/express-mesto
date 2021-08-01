const User = require('../models/user');

const errors = require('../helpers/errors');

const options = {
  runValidators: true,
  new: true,
};

module.exports.getUsers = (req, res) => User.find({})
  .then((data) => res.send({ data }))
  .catch(() => res
    .status(errors.codes.serverError)
    .send({ message: errors.messages.default }));

module.exports.findUser = (req, res) => User.findById(req.params.id)
  .then((data) => (data
    ? res.send({ data })
    : res
      .status(errors.codes.notFound)
      .send({ message: errors.messages.castError })))
  .catch((err) => (err.name === errors.names.cast
    ? res
      .status(errors.codes.badRequest)
      .send({ message: errors.messages.castError })
    : res
      .status(errors.codes.serverError)
      .send({ message: errors.messages.default })));

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((data) => res.send({ data }))
    .catch((err) => (err.name === errors.names.validation
      ? res
        .status(errors.codes.badRequest)
        .send({ message: errors.messages.validationError })
      : res
        .status(errors.codes.serverError)
        .send({ message: errors.messages.default })));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((data) => (data
      ? res.send({ data })
      : res
        .status(errors.codes.notFound)
        .send({ message: errors.messages.castError })))
    .catch((err) => {
      if (err.name === errors.names.validation) {
        return res
          .status(errors.codes.badRequest)
          .send({ message: errors.messages.validationError });
      }
      return err.name === errors.names.cast
        ? res
          .status(errors.codes.badRequest)
          .send({ message: errors.messages.castError })
        : res
          .status(errors.codes.serverError)
          .send({ message: errors.messages.default });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((data) => (data
      ? res.send({ data })
      : res
        .status(errors.codes.notFound)
        .send({ message: errors.messages.castError })))
    .catch((err) => {
      if (err.name === errors.names.validation) {
        return res
          .status(errors.codes.badRequest)
          .send({ message: errors.messages.validationError });
      }
      return err.name === errors.names.cast
        ? res
          .status(errors.codes.badRequest)
          .send({ message: errors.messages.castError })
        : res
          .status(errors.codes.serverError)
          .send({ message: errors.messages.default });
    });
};
