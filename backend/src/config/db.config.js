const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info('Database connected successfully');
    } catch (err) {
        logger.fatal({ err }, 'Database connection failed');
        process.exit(1);
    }
};

module.exports = connectDB;
