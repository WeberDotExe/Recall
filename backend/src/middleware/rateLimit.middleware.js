const rateLimit = require("express-rate-limit")
const logger = require('../config/logger');

const authLimiter = rateLimit({
    windowMs:15 * 60 * 1000,
    max:10,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        success:false,
        message:"too many authentication attempts. please try again after 15 min "
    },
    handler: (req, res, next, options) => {
        logger.warn({ path: req.path, method: req.method, ip: req.ip }, 'Rate-limited request');
        res.status(options.statusCode).json({
            success:false,
            message:"too many authentication attempts. please try again after 15 min "
        });
    },
});

const apiLimiter = rateLimit({
    windowMs:15 * 60 *1000,
    max:100,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        success:false,
        message:"too many request please try again later "
    },
    handler: (req, res, next, options) => {
        logger.warn({ path: req.path, method: req.method, ip: req.ip }, 'Rate-limited request');
        res.status(options.statusCode).json({
            success:false,
            message:"too many request please try again later "
        });
    },
});

module.exports={
    authLimiter,
    apiLimiter
}