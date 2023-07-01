const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const options = {
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
          };
        const conn = await mongoose.connect(process.env.MONGO_URI, options);
        // eslint-disable-next-line no-console
        console.log(`MongoDB connected to port: ${conn.connection.host}`);
    } catch (err) {
        process.exit(1);
    }
};

module.exports = connectDB;
