const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d'
});

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
        res.send('user Registered');
        next();
    } else {
        res.send('Username already exists');
        next();
    }
};

const userLogin = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.send({
            token: generateToken(user._id)
        });
    } else {
        res.send('User or password mismatch');
        next();
    }
};

const userGet = async (req, res, next) => {
    if (req.user !== undefined) {
        const username = req.user.username;
        const user = await User.findOne({ username });
        res.send(user);
    } else {
        res.send('Auth token modified');
        next();
    }
};

module.exports = { userRegister, userLogin, userGet };
