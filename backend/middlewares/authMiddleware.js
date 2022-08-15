const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const APIError = require('../config/APIError');

// @desc Middleware to protect auth routes
const protect = async (req, res, next) => {
    let token = '';
    console.log(req.headers);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (err) {
            next(APIError.unauthorized('Unauthorized access'));
        }
    } else {
        next(APIError.notFound('Auth token missing'));
    }
};

module.exports = { protect };
