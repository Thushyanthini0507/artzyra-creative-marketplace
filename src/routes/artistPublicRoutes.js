/**
 * Artist Public & Admin Routes
 * Exposes approved artists publicly and provides admin-only moderation
 */
import express from "express";
import {
  getArtists,
  getArtistById,
} from "../controllers/artistPublicController.js";
import {
  getPendingArtists,
  approveArtist,
  rejectArtist,
} from "../controllers/artistController.js";
import { verifyToken, checkApproval } from "../middleware/authMiddleware.js";
import { verifyRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin-only moderation endpoints (must come before /:id route)
router.get(
  "/pending",
  verifyToken,
  verifyRole("admin"),
  checkApproval,
  getPendingArtists
);

router.put(
  "/approve/:id",
  verifyToken,
  verifyRole("admin"),
  checkApproval,
  approveArtist
);

router.put(
  "/:id/approve",
  verifyToken,
  verifyRole("admin"),
  checkApproval,
  approveArtist
);

router.delete(
  "/reject/:id",
  verifyToken,
  verifyRole("admin"),
  checkApproval,
  rejectArtist
);

router.put(
  "/:id/reject",
  verifyToken,
  verifyRole("admin"),
  checkApproval,
  rejectArtist
);

// Public endpoints for approved artists
router.get("/", getArtists);
// This must be last to avoid catching other routes
// Only match if it looks like a MongoDB ObjectId (24 hex characters)
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  // Check if it's a valid MongoDB ObjectId format
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    // It's a valid ObjectId, proceed to getArtistById
    return getArtistById(req, res, next);
  }
  // Not a valid ObjectId, skip this route and let other routers handle it
  next();
});

export default router;
