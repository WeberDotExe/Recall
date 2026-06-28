require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db.config');
const logger = require('./src/config/logger');
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log(process.env.MONGO_URI)
    await connectDB();

    app.listen(PORT, () => {
      logger.info({ port: PORT }, 'Server running');
    });
  } catch (err) {
    logger.fatal({ err }, 'Server startup failed');
    process.exit(1);
  }
};

startServer();