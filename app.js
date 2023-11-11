require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const auth = require('./middlewares/auth');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const NOT_FOUND = require('./errors/NotFound');
const { MONGO_URL } = require('./utils/config');

const {
  validateLogin,
  validateCreateUser,
} = require('./middlewares/validation');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(limiter);
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => {
  next(new NOT_FOUND('Ошибка - 404 Страница не найдена'));
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'Произошла ошибка на стороне сервера' : error.message;
  res.status(statusCode).send({ message });
  next();
});

async function init() {
  await mongoose.connect(MONGO_URL);
  console.log('DB CONNECT');

  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
init();
