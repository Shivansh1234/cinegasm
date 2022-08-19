const express = require('express');
const { addMovie } = require('../controllers/movieController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/addMovie', protect, addMovie);

module.exports = router;
