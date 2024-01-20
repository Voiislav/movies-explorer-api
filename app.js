const express = require('express');

const mongoose = require('mongoose');

const ErrorNotFound = require('./errors/ErrorNotFound');

const auth = require('./middlewares/auth');

const { createUser, login, logout } = require('./controllers/users');

const { signinSchema, signupSchema } = require('./middlewares/validation');

const app = express();

app.post('/signin', signinSchema, login);

app.post('/signup', signupSchema, createUser);

app.post('/signout', logout);

app.use(auth);

app.use('/users', require('./routes/users'));

app.use('/movies', require('./routes/movies'));

app.use((req, res, next) => {
  next(new ErrorNotFound('Маршрут не найден'));
});

mongoose.connect('mongodb://localhost:27017//bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
