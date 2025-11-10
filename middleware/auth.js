import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "./errorHandler.js";
import { UnauthorizedError } from "../utils/errors.js";

/**
 * Protect routes - Verify JWT token
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    throw new UnauthorizedError("Not authorized to access this route");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      throw new UnauthorizedError("User not found");
    }

    next();
  } catch (error) {
    throw new UnauthorizedError("Not authorized to access this route");
  }
});

/**
 * Grant access to specific roles
 */
export const authorize = (...roles) => {
  return asyncHandler((req, res, next) => {
    if (!req.user) {
      throw new UnauthorizedError("Not authorized to access this route");
    }

    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        `User role '${req.user.role}' is not authorized to access this route`
      );
    }

    next();
  });
};

/**
 * Admin only middleware (Super Admin, Admin)
 */
export const adminOnly = authorize("Super Admin", "Admin");

/**
 * Super Admin only middleware
 */
export const superAdminOnly = authorize("Super Admin");
