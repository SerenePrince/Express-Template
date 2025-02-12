const logger = require("../utils/logger");

require("dotenv").config();

const corsOptions = {
  origin: (() => {
    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
      logger.warn(
        "FRONTEND_URL is not defined in .env. CORS configuration may not work as expected."
      );
      return [];
    }
    return frontendUrl.includes(",") ? frontendUrl.split(",") : [frontendUrl];
  })(),
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: process.env.NODE_ENV === "production" ? 204 : 200,
};

module.exports = corsOptions;
