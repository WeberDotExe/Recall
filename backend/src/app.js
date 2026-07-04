const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");
const errorHandler = require("./middleware/error.middleware");
const { authLimiter, apiLimiter } = require("./middleware/rateLimit.middleware");
const loggerMiddleware = require("./middleware/logger.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://recall-roan-iota.vercel.app",
];

app.use(loggerMiddleware);
app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, server-to-server, health checks)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

app.use(cookieParser());

app.use("/api/auth", authLimiter);
app.use("/api", apiLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(errorHandler);

module.exports = app;