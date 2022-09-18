const express = require('express');
const {
    addMovie, getMovies, getActorMovies, deleteMovie
} = require('../controllers/movieController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/addMovie', protect, addMovie);
router.delete('/deleteMovie', protect, deleteMovie);
router.get('/getMovies', protect, getMovies);
router.get('/getActorMovies', protect, getActorMovies);

module.exports = router;
