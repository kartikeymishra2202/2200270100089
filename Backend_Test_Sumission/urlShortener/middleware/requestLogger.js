import { Log } from "../../../LoggingMiddleware/logger.js";

export function requestLogger(req, res, next) {
  Log(
    "backend",
    "debug",
    "middleware",
    `${req.method} ${req.originalUrl} called`
  );
  next();
}
