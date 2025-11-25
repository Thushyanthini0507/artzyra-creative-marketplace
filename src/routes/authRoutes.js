/**
 * Authentication Routes
 * Public routes for login and session management
 * Protected routes for user profile management
 */
import express from "express";
import { login, getMe, logout, registerCustomer, registerArtist } from "../controllers/authController.js";
import { verifyToken, checkApproval } from "../middleware/authMiddleware.js";
import { verifyRole } from "../middleware/roleMiddleware.js";
import { authRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public routes - Registration and Login
// Note: Order matters - more specific routes should come first
router.post("/register/customer", authRateLimiter, registerCustomer);
router.post("/register/artist", authRateLimiter, registerArtist);
router.post("/login", authRateLimiter, login);

// Debug route to verify routing works
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth routes are working",
    availableRoutes: [
      "POST /api/auth/register/customer",
      "POST /api/auth/register/artist",
      "POST /api/auth/login",
      "GET /api/auth/me",
      "POST /api/auth/logout"
    ]
  });
});

const authenticatedRoles = ["admin", "artist", "customer"];

// Protected routes
router.get(
  "/me",
  verifyToken,
  verifyRole(authenticatedRoles),
  checkApproval,
  getMe
);
router.post(
  "/logout",
  verifyToken,
  verifyRole(authenticatedRoles),
  checkApproval,
  logout
);

export default router;
