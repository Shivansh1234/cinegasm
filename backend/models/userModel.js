const mongoose = require('mongoose');
const movieSchema = require('./movieModel');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    movies: [movieSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
