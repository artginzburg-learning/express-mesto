const Card = require('../models/card');

const errors = require('../helpers/errors');

const options = { new: true };
const defaultPopulation = ['owner', 'likes'];

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.send({ data }))
    .catch((err) => (err.name === errors.names.validation
      ? res
        .status(errors.codes.badRequest)
        .send({ message: errors.messages.validation })
      : res
        .status(errors.codes.serverError)
        .send({ message: errors.messages.default })));
};

module.exports.getCards = (req, res) => Card.find({})
  .populate(defaultPopulation)
  .then((data) => res.send({ data }))
  .catch((err) => res
    .status(errors.codes.serverError)
    .send({ message: errors.messages.default }));

module.exports.deleteCard = (req, res) => Card.findByIdAndDelete(req.params.id)
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

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  options,
)
  .populate(defaultPopulation)
  .then((data) => (data
    ? res.send({ data })
    : res
      .status(errors.codes.notFound)
      .send({ message: errors.messages.castError })))
  .catch((err) => (err.name === errors.names.validation
    ? res
      .status(errors.codes.badRequest)
      .send({ message: errors.messages.validationError })
    : res
      .status(errors.codes.serverError)
      .send({ message: errors.messages.default })));

module.exports.unLikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  options,
)
  .populate(defaultPopulation)
  .then((data) => (data
    ? res.send({ data })
    : res
      .status(errors.codes.notFound)
      .send({ message: errors.messages.castError })))
  .catch((err) => (err.name === errors.names.validation
    ? res
      .status(errors.codes.badRequest)
      .send({ message: errors.messages.validationError })
    : res
      .status(errors.codes.serverError)
      .send({ message: errors.messages.default })));
