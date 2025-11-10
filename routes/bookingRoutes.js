import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
} from "../controllers/bookingController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const bookingRouter = express.Router();

// All booking routes require admin access
bookingRouter.get("/", protect, adminOnly, getAllBookings);
bookingRouter.get("/:id", protect, adminOnly, getBookingById);
bookingRouter.post("/", protect, adminOnly, createBooking);
bookingRouter.put("/:id", protect, adminOnly, updateBooking);
bookingRouter.delete("/:id", protect, adminOnly, deleteBooking);

export default bookingRouter;
