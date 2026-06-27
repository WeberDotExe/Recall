const express = require('express');
const helmet = require("helmet");
const cors = require("cors")
// const rateLimit = require('express-rate-limit')    
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const noteRoutes = require('./routes/note.routes');
const errorHandler = require('./middleware/error.middleware');
const {authLimiter,apiLimiter} = require('./middleware/rateLimit.middleware')
const loggerMiddleware = require('./middleware/logger.middleware')
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require('./config/swagger')

const app = express();

app.use(loggerMiddleware)
app.use(helmet())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}))
app.use(express.json({
    limit:"10kb"
}));
app.use(express.urlencoded({
    extended:true,
    limit:"10kb"
}))
app.use(cookieParser());

app.use('/api/auth',authLimiter);
app.use('/api',apiLimiter)

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpecs))

app.use(errorHandler);

 module.exports = app;