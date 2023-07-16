const express = require('express');
const {
    userRegister, userLogin, userGet, userUpdate
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/userRegister', userRegister);
router.post('/userLogin', userLogin);
router.get('/userGet', protect, userGet);
router.put('/userUpdate', protect, userUpdate);

module.exports = router;
