require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const router = require('./routes/index');
const NOT_FOUND_ERROR = require('./errors/NotFound');
const { MONGO_URL } = require('./utils/config');
const { NOT_FOUND_MESSAGE } = require('./utils/constants');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(limiter);
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => {
  next(new NOT_FOUND_ERROR(NOT_FOUND_MESSAGE));
});

app.use(errorHandler);

async function init() {
  await mongoose.connect(MONGO_URL);
  console.log('DB CONNECT');

  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
init();
