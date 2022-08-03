const APIError = require('../config/APIError');

// @desc Handling custom error
const errorHandler = (err, req, res, next) => {
    if (err instanceof APIError) {
        res.status(err.status).json(err);
        next();
    } else {
        res.status(500).json('something went wrong');
        next();
    }
};

module.exports = errorHandler;
