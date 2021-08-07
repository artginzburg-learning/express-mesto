const { Card } = require('../models');

const errors = require('../helpers/errors');
const { StatusCodes } = require('../helpers/StatusCodes');

const options = { new: true };
const defaultPopulation = ['owner', 'likes'];

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.send({ data }))
    .catch((err) => (err.name === errors.names.validation
      ? res
        .status(StatusCodes.badRequest)
        .send({ message: errors.messages.validation })
      : res
        .status(StatusCodes.internalServerError)
        .send({ message: errors.messages.default })));
};

module.exports.getCards = (req, res) => Card.find({})
  .populate(defaultPopulation)
  .then((data) => res.send({ data }))
  .catch(() => res
    .status(StatusCodes.internalServerError)
    .send({ message: errors.messages.default }));

module.exports.deleteCard = async (req, res) => {
  const card = await Card.findById(req.params.id).populate(defaultPopulation);

  return card.owner._id === req.user._id
    ? card.delete()
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
          .send({ message: errors.messages.default })))
    : res
      .status(StatusCodes.forbidden)
      .send({ message: errors.messages.forbiddenError });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  options,
)
  .populate(defaultPopulation)
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

module.exports.unLikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  options,
)
  .populate(defaultPopulation)
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
