// Centralized error handling middleware for Enterprise HRMS

const errorHandler = (err, req, res, next) => {
  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );

  console.error(err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

const notFoundHandler = (req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
