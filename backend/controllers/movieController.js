const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const APIError = require('../config/APIError');
const APIResponse = require('../config/APIResponse');
// @desc Adding Movie
// @route POST /addMovie
// @access PRIVATE
function getUserId(token) {
    const decodedId = jwt.verify(token, process.env.JWT_SECRET).id;
    return decodedId;
}

const addMovie = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = getUserId(token);
    const movieData = req.body;

    const userFilter = { _id: userId };
    const movieAddQuery = { $push: { movies: movieData } };
    const movieMatchQuery = { movies: { $elemMatch: { imdbID: movieData.imdbID } } };
    const movieList = await User.findOne(userFilter, movieMatchQuery);
    if (movieList.movies.length === 0) {
        const result = await User.updateOne(userFilter, movieAddQuery);
        if (result.acknowledged) {
            res.send(APIResponse.created(`${movieData.Title} - Movie added`, movieData));
        } else {
            next(APIError.internal('Some error occured'));
        }
    } else {
        next(APIError.conflict('Movie already present'));
    }
    // const result = await User.updateOne(filter, query);
};

module.exports = { addMovie };
