const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const APIError = require('../config/APIError');
const APIResponse = require('../config/APIResponse');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d'
});

// @desc Registering User
// @route POST /userRegister
// @access PUBLIC
const userRegister = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await User.findOne({ username });
    if (userExists === null) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = {
            username,
            password: hashedPassword
        };
        await User.create(user);
        const createdData = { username };
        const createdMessage = 'User registered successfully';
        res.send(APIResponse.created(createdMessage, createdData));
    } else {
        const error = 'Username already exists';
        next(APIError.conflict(error));
    }
};

// @desc Logging in User
// @route POST /userLogin
// @access PUBLIC
const userLogin = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const getMessage = 'Logged In successfully';
            const getData = {
                username: user.username,
                token: generateToken(user._id)
            };
            res.send(APIResponse.get(getMessage, getData));
        } else {
            next(APIError.badRequest('Password doesnt match'));
        }
    } else {
        next(APIError.notFound('Username not found'));
    }
};

// @desc Getting user details
// @route GET /userGet
// @access PRIVATE
const userGet = async (req, res, next) => {
    if (req.user !== undefined) {
        const username = req.user.username;
        const user = await User.findOne({ username });

        const getMessage = 'User data fetched successfully';
        const getData = {
            username: user.username,
            token: generateToken(user._id)
        };
        res.send(APIResponse.get(getMessage, getData));
    } else {
        const error = 'Auth token modified';
        next(APIError.badRequest(error));
    }
};

module.exports = { userRegister, userLogin, userGet };
