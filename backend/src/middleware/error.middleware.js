const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(
        { err, path: req.path, method: req.method },
        'Unhandled application error'
    );

    res.status(err.statusCode || 500).json({
        success: err.success || false,
        message: err.message || 'internal server error',
    });
};

module.exports = errorHandler;