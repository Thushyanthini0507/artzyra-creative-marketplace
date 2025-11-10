/**
 * Global error handling middleware
 * Location: /middleware/errorHandler.js
 */

import { AppError } from "../utils/errors.js";

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // Handle custom AppError instances
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;

    // Include validation errors if present
    if (err.errors && Array.isArray(err.errors)) {
      errors = err.errors;
    }

    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    message = `${
      field.charAt(0).toUpperCase() + field.slice(1)
    } already exists`;
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  // Handle "not found" errors (string matching for backward compatibility)
  if (message.toLowerCase().includes("not found")) {
    statusCode = 404;
  }

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", err);
  }

  // Default error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err.message,
    }),
  });
};

/**
 * Async handler wrapper to catch errors in async route handlers
 * This eliminates the need for try-catch blocks in controllers
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
