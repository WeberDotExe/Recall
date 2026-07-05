const pinoHttp = require("pino-http");
const logger = require("../config/logger");

const loggerMiddleware = pinoHttp({
  logger,
  customSuccessMessage: function (req, res) {
    return "request completed";
  },
  customErrorMessage: function (req, res, err) {
    return "request errored";
  },
  customProps: function (req, res) {
    return {
      responseTimeMs: res.responseTime,
    };
  },
  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
        query: req.query,
        params: req.params,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});

module.exports = loggerMiddleware;