const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((user) =>
      res.send(
        "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое"
      )
    );
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((users) =>
      res.send(
        "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое"
      )
    );
};
