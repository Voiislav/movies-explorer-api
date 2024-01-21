const express = require('express');

const router = express.Router();

const { getAllMovies, addMovie, deleteMovie } = require('../controllers/movies');

const { addMovieSchema, deleteMovieSchema } = require('../middlewares/validation');

router.get('/movies', getAllMovies);
router.post('/movies', addMovieSchema, addMovie);
router.delete('/:movieId', deleteMovieSchema, deleteMovie);

module.exports = router;
