const mongoose = require("mongoose");

const validateUrl = require("./helpers/validateUrl");
const defaultLengthConstrained = require("./helpers/defaultLengthConstrained");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    ...defaultLengthConstrained,
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
