const Movie = require('../models/movie');

const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');
const ErrorBadRequest = require('../errors/ErrorBadRequest');

module.exports.getAllMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId }) // movies of current user
    .then((movies) => {
      res.json(movies);
    })
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(201).json({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'Validation Error') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new ErrorNotFound('Фильм не найден в вашей коллекции'));
      }
      if (movie.owner.toString() !== userId) {
        return next(new ErrorForbidden('Недостаточно прав для удаления фильма из коллекции'));
      }
      return Movie.deleteOne({ _id: movieId });
    })
    .then(() => {
      res.json({ message: 'Фильм удален из коллекции' });
    })
    .catch(next);
};
