const User = require('../models/userModel');
const APIError = require('../config/APIError');
const APIResponse = require('../config/APIResponse');
// @desc Adding Movie
// @route POST /addMovie
// @access PRIVATE

function formatMovie(movie) {
    // Splitting strings to array
    const directors = movie.Director.split(', ');
    const writers = movie.Writer.split(', ');
    const genre = movie.Genre.split(', ');
    const actors = movie.Actors.split(', ');
    const language = movie.Language.split(', ');
    const country = movie.Country.split(', ');
    movie.Director = directors;
    movie.Writer = writers;
    movie.Genre = genre;
    movie.Actors = actors;
    movie.Language = language;
    movie.Country = country;
    return movie;
}

const addMovie = async (req, res, next) => {
    const userId = req.user._id;
    const movie = req.body;

    const userFilter = { _id: userId };
    const movieAlreadyExistsQuery = { movies: { $elemMatch: { imdbID: movie.imdbID } } };
    const movieList = await User.findOne(userFilter, movieAlreadyExistsQuery);
    if (movieList.movies.length === 0) {
        const movieData = formatMovie(movie);
        const movieAddQuery = { $push: { movies: { $each: [movie], $sort: { Title: 1 } } } };
        const result = await User.updateOne(userFilter, movieAddQuery);
        if (result.acknowledged) {
            res.send(APIResponse.created(`${movieData.Title} - Movie added`));
        } else {
            next(APIError.internal('Some error occured'));
        }
    } else {
        next(APIError.conflict('Movie already present'));
    }
    // const result = await User.updateOne(filter, query);
};

const getMovieDetails = async (req, res, next) => {
    const userId = req.user._id;
    const movieId = req.query.movieId;

    const userFilter = { _id: userId };
    const movieDetails = { movies: { $elemMatch: { imdbID: movieId } } };
    const movieData = await User.findOne(userFilter, movieDetails);
    if (movieData.movies.length >= 1) {
        res.send(APIResponse.get('Movie Data fetched', movieData.movies[0]));
    } else {
        next(APIError.notFound('Movie not found'));
    }
};

const deleteMovie = async (req, res, next) => {
    const userId = req.user._id;
    const movie = req.query.movieId;

    const userFilter = { _id: userId };
    const movieMatchQuery = { movies: { $elemMatch: { imdbID: movie } } };
    const movieList = await User.findOne(userFilter, movieMatchQuery);
    const movieTitle = movieList.movies[0]?.Title;
    if (movieTitle !== undefined) {
        const movieDeleteQuery = { $pull: { movies: { imdbID: movie } } };
        const result = await User.findOneAndUpdate(userFilter, movieDeleteQuery);
        if (result) {
            res.send(APIResponse.deleted(`${movieTitle} - Movie deleted`));
        } else {
            next(APIError.internal(`Unable to delete - ${movieTitle}`));
        }
    } else {
        next(APIError.notFound('Movie not found'));
    }
};

function sortMovies(req, movies) {
    const sort = req.query.sort;
    const order = req.query.order;
    movies.sort((a, b) => {
        const nameA = a[sort].toUpperCase(); // ignore upper and lowercase
        const nameB = b[sort].toUpperCase(); // ignore upper and lowercase
        if (order === 'desc') {
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        }
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
    return movies;
}

const getMovies = async (req, res, next) => {
    const userId = req.user._id;

    const userFilter = { _id: userId };
    let movieObj = {};
    if (req.query.search) {
        const movieGetQuery = { movies: { $elemMatch: { Title: new RegExp(req.query.search, 'i') } } };
        movieObj = await User.findOne(userFilter, movieGetQuery);
    } else {
        movieObj = await User.findOne(userFilter);
    }
    const sortedMovies = sortMovies(req, movieObj.movies);

    if (sortedMovies.length === 0) {
        next(APIError.noContent('No movies found'));
    } else {
        const pageIndex = parseInt(req.query.pageIndex, 10);
        const pageSize = parseInt(req.query.pageSize, 10);
        const first = pageSize * (pageIndex - 1);
        const last = pageSize * pageIndex;
        const movieList = sortedMovies.slice(first, last);
        const movieResp = {
            movies: movieList,
            total: movieObj.movies.length,
            pageIndex,
            pageSize
        };
        res.send(APIResponse.get('Movies fetched successfully', movieResp));
    }
};

const getListTypeMovies = async (req, res, next) => {
    const userId = req.user._id;
    const listType = req.query.type;
    const listId = req.query.id;

    const userFilter = { _id: userId };
    const type = listType[0].toUpperCase() + listType.slice(1);
    const actorMovieList = await User.findOne(userFilter);
    const list = actorMovieList.movies.filter((a) => a[type].includes(listId));
    if (actorMovieList.movies.length) {
        res.send(APIResponse.get('Actor movies fetched successfully', list));
    } else {
        next(APIError.noContent(`No movies found with actor - ${listId}`));
    }
};

module.exports = {
    addMovie, getMovies, getListTypeMovies, deleteMovie, getMovieDetails
};
