require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');

const { StatusCodes } = require('./helpers/StatusCodes');
const { messages } = require('./helpers/messages');

const { PORT = 3000, HOST = 'localhost' } = process.env;

const app = express();

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // in 15m...
  max: 100, // requests per IP.
}));

app.use(helmet());

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

app.use(cookieParser());

app.use(express.json());

app.post(['/signup', '/register', '/reg'], createUser);
app.post(['/signin', '/login'], login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((err, req, res) => {
  const {
    statusCode = StatusCodes.internal,
    message = messages.internal,
  } = err;

  res.status(statusCode).send({ message });
});

app.listen(PORT, () => console.log(`API listening on http://${HOST}:${PORT}`));
