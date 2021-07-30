const Card = require("../models/card");

module.exports.createCard = (req, res) => {
  const { name, link, ownerId } = req.body;

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
  Card.findByIdAndDelete(req.params.cardId).then((value) =>
    res.send({ message: value })
  );
};
