/**
 * Upload Controller
 * Handles image uploads to Cloudinary with folder organization
 */
import { asyncHandler } from "../middleware/authMiddleware.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { BadRequestError } from "../utils/errors.js";

/**
 * Upload image endpoint
 * @route POST /api/upload
 * @body {File} image - Image file
 * @body {string} imageType - Type of image: 'category', 'admin_profile', 'customer_profile', 'artist_profile'
 */
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new BadRequestError("No image file provided");
  }

  // Get image type from request body, default to 'category'
  const imageType = req.body.imageType || "category";

  // Validate image type
  const validTypes = ["category", "admin_profile", "customer_profile", "artist_profile"];
  if (!validTypes.includes(imageType)) {
    throw new BadRequestError(
      `Invalid image type. Must be one of: ${validTypes.join(", ")}`
    );
  }

  // Upload to Cloudinary with folder organization
  const result = await uploadToCloudinary(req.file.buffer, imageType, {
    mimeType: req.file.mimetype,
  });

  res.json({
    success: true,
    data: {
      url: result.url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    },
  });
});

