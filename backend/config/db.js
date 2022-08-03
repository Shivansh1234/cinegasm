const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // eslint-disable-next-line no-console
        console.log(`MongoDB connected to port: ${conn.connection.host}`);
    } catch (err) {
        process.exit(1);
    }
};

module.exports = connectDB;
