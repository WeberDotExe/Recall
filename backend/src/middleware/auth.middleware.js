const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const logger = require('../config/logger');

const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        logger.warn({ path: req.path, method: req.method }, 'Unauthorized access attempt: missing token');
        throw new ApiError(401, "Unauthorized, please login");
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            logger.warn({ path: req.path, method: req.method }, 'Access token expired');
            throw new ApiError(401, 'Access token expired');
        }

        if (error.name === 'JsonWebTokenError') {
            logger.warn({ path: req.path, method: req.method }, 'Invalid access token');
            throw new ApiError(401, 'Invalid access token');
        }

        logger.error({ err: error, path: req.path, method: req.method }, 'Unexpected JWT verification error');
        throw error;
    }

    const user = await userModel
        .findById(decoded.id)
        .select("-password");

    if (!user) {
        logger.warn({ userId: decoded.id, path: req.path }, 'Unauthorized access attempt: user not found');
        throw new ApiError(401, "User not found");
    }

    req.user = user;

    next();
});

module.exports = authMiddleware;