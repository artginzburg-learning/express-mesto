const Card = require("../models/card");

const defaultPopulation = ["owner", "likes"];

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })

    .then((card) => res.send({ data: card }))
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(defaultPopulation)
    .then((card) => res.send({ data: card }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id).then((value) =>
    res.send({ message: "Успешно" })
  );
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(defaultPopulation)
    .then((card) => res.send({ data: card }))
    .catch(console.error);

module.exports.unLikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate(defaultPopulation)
    .then((card) => res.send({ data: card }))
    .catch(console.error);
