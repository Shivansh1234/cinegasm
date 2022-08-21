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

function formatMovie(movie) {
    // Splitting strings to array
    const directors = movie.Director.split(', ');
    const writers = movie.Writer.split(', ');
    const actors = movie.Actors.split(', ');
    const language = movie.Language.split(', ');
    const country = movie.Country.split(', ');
    movie.Director = directors;
    movie.Writer = writers;
    movie.Actors = actors;
    movie.Language = language;
    movie.Country = country;
    return movie;
}

const addMovie = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = getUserId(token);
    const movie = req.body;

    const userFilter = { _id: userId };
    const movieAddQuery = { $push: { movies: movie } };
    const movieMatchQuery = { movies: { $elemMatch: { imdbID: movie.imdbID } } };
    const movieList = await User.findOne(userFilter, movieMatchQuery);
    if (movieList.movies.length === 0) {
        const movieData = formatMovie(movie);
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

const getMovies = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = getUserId(token);

    const userFilter = { _id: userId };
    const movieGetQuery = { movies: 1, _id: 0 };

    const movieList = await User.findOne(userFilter, movieGetQuery);
    if (movieList.movies.length === 0) {
        next(APIError.noContent('No movies found'));
    } else {
        res.send(APIResponse.get('Movies fetched successfully', movieList.movies));
    }
};

module.exports = { addMovie, getMovies };
