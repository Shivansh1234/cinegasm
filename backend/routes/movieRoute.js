const express = require('express');
const { addMovie } = require('../controllers/movieController');
const { getMovies } = require('../controllers/movieController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/addMovie', protect, addMovie);
router.get('/getMovies', protect, getMovies);

module.exports = router;
