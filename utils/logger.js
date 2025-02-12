const winston = require("winston");
const { format } = winston;
const winstonRotate = require("winston-daily-rotate-file");

const logLevel = process.env.NODE_ENV === "production" ? "warn" : "debug";

const logger = winston.createLogger({
  level: logLevel,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winstonRotate({
      filename: "logs/%DATE%-combined.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d", // Keeps logs for the last 14 days
    }),
  ],
});

// Handle uncaught exceptions
winston.exceptions.handle(
  new winston.transports.Console(),
  new winston.transports.File({ filename: "logs/exceptions.log" })
);

module.exports = logger;
