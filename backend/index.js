const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const userRoute = require('./routes/userRoute');
const movieRoute = require('./routes/movieRoute');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Mongodb connection
connectDB();

// Initializing server
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`cinegasm backend server listening at port - ${process.env.PORT}`);
});

// Serving static files under public
app.use(express.static('public'));

// Using cors
app.use(cors());

// Using bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Redirecting to modular routes
app.use('/users', userRoute);
app.use('/movie', movieRoute);

// Custom Error Handler middleware
app.use(errorHandler);
