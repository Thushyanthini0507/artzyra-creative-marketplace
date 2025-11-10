import express from "express";
import {
  createArtist,
  deleteArtist,
  getAllArtist,
  getArtistById,
  updateArtist,
} from "../controllers/artistController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const ArtistRouter = express.Router();

// All artist routes require admin access
ArtistRouter.get("/", protect,  getAllArtist);
ArtistRouter.get("/:id", protect, adminOnly, getArtistById);
ArtistRouter.post("/", protect, adminOnly, createArtist);
ArtistRouter.put("/:id", protect, adminOnly, updateArtist);
ArtistRouter.delete("/:id", protect, adminOnly, deleteArtist);

export default ArtistRouter;
