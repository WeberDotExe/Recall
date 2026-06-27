const pinoHttp = require("pino-http")
const logger = require('../config/logger')

const loggerMiddleware = pinoHttp({
    logger,
})

module.exports = loggerMiddleware