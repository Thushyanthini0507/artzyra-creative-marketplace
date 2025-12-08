/**
 * Upload Routes
 * Handles image upload endpoints
 */
import express from "express";
import multer from "multer";
import { BadRequestError } from "../utils/errors.js";
import { uploadImage } from "../controllers/uploadController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new BadRequestError("Only image files are allowed"), false);
    }
  },
});

// Upload image endpoint (requires authentication)
// POST /api/upload
// Body: FormData with 'image' file and optional 'imageType' field
// imageType options: 'category', 'admin_profile', 'customer_profile', 'artist_profile'
router.post("/", verifyToken, upload.single("image"), uploadImage);

export default router;

