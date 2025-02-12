const rateLimit = require("express-rate-limit");
const logger = require("../utils/logger");

// Default rate limit handler
const rateLimitHandler = (req, res) => {
  logger.warn(
    `Rate limit exceeded for IP: ${req.ip} on ${req.method} ${req.originalUrl}`
  );
  res.status(429).json({
    error: "Too many requests, please try again later.",
    details: `You have exceeded the rate limit for ${req.originalUrl}. Please try again in a while.`,
  });
};

// Base configuration
const createRateLimiter = (maxRequests, windowMs) =>
  rateLimit({
    windowMs,
    max: maxRequests,
    message: "Too many requests, please try again later.",
    headers: true, // Send rate limit headers
    handler: rateLimitHandler,
    keyGenerator: (req) => req.user?.id || req.ip, // Prioritize user ID over IP
  });

// General API rate limiter (configurable)
const generalLimiter = createRateLimiter(
  process.env.RATE_LIMIT_GENERAL || 2000,
  60 * 60 * 1000
);

// Sensitive actions rate limiter (configurable)
const sensitiveLimiter = createRateLimiter(
  process.env.RATE_LIMIT_SENSITIVE || 200,
  60 * 60 * 1000
);

module.exports = { generalLimiter, sensitiveLimiter };
