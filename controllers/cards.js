const Card = require("../models/card");

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId }).then((card) =>
    res.send({ data: card })
  );
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((card) => res.send({ data: card }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id).then((value) =>
    res.send({ message: "Успешно" })
  );
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );

module.exports.unLikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );
