const mongoose = require("mongoose");

const stringWithConstrainedLength = require("./helpers/stringWithConstrainedLength");
const validateUrl = require("./helpers/validateUrl");

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
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;
