const express = require('express');

const router = express.Router();

const { getAllMovies, addMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getAllMovies);
router.post('/movies', addMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
