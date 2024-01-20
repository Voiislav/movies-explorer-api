const express = require('express');

const mongoose = require('mongoose');

const ErrorNotFound = require('./errors/ErrorNotFound');

const auth = require('./middlewares/auth');

const app = express();

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
