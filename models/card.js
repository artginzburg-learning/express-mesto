const mongoose = require("mongoose");

const stringWithConstrainedLength = require("./helpers/stringWithConstrainedLength");
const validateUrl = require("./helpers/validateUrl");

const refUserId = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "user",
};

const cardSchema = new mongoose.Schema({
  name: {
    ...stringWithConstrainedLength,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validator: validateUrl,
  },
  owner: {
    ...refUserId,
    required: true,
  },
  likes: [
    {
      ...refUserId,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;
