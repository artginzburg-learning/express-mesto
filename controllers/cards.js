const Card = require("../models/card");

module.exports.createCard = (req, res) => {
  const { title, text, ownerId } = req.body;

  Card.create({ title, text, owner: ownerId }).then((card) =>
    res.send({ data: card })
  );
};

module.exports.getCard = (req, res) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((card) => res.send({ data: card }));
};
