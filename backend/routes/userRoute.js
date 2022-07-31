const express = require('express');
const { userRegister, userLogin, userGet } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/userRegister', userRegister);
router.post('/userLogin', userLogin);
router.get('/userGet', protect, userGet);

module.exports = router;
