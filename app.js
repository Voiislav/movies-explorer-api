const express = require('express');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const helmet = require('helmet');

const { errors } = require('celebrate');

const mongoose = require('mongoose');

const ErrorNotFound = require('./errors/ErrorNotFound');

const auth = require('./middlewares/auth');

const { createUser, login, logout } = require('./controllers/users');

const { signinSchema, signupSchema } = require('./middlewares/validation');

const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(helmet());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', signinSchema, login);

app.post('/signup', signupSchema, createUser);

app.post('/signout', logout);

app.use(auth);

app.use('/users', require('./routes/users'));

app.use('/movies', require('./routes/movies'));

app.use((req, res, next) => {
  next(new ErrorNotFound('Маршрут не найден'));
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
});
