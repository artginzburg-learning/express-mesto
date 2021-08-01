const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { PORT = 3000, HOST = "localhost" } = process.env;

const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

mongoose.connect(`mongodb://${HOST}:27017/mestodb`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: "61046313f81802008f17f176",
  };

  next();
});

app.use("/users", require("./routes/users"));

app.use("/cards", require("./routes/cards"));

app.listen(PORT, () => console.log(`API listening on http://${HOST}:${PORT}`));
