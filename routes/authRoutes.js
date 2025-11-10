import express from "express";
import {
  register,
  login,
  getMe,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updatePassword,
} from "../controllers/authController.js";
import { protect, adminOnly, superAdminOnly } from "../middleware/auth.js";

const userRouter = express.Router();

// Public routes
userRouter.post("/login", login);
userRouter.post("/register", register); // Public for first user, protected for admins (handled in controller)

// Protected routes (require authentication)
userRouter.get("/me", protect, getMe);
userRouter.put("/updatepassword", protect, updatePassword);

// Admin only routes
userRouter.get("/", protect, adminOnly, getAllUsers);
userRouter.get("/:id", protect, adminOnly, getUserById);
userRouter.put("/:id", protect, adminOnly, updateUser);

// Super Admin only routes
userRouter.delete("/:id", protect, superAdminOnly, deleteUser);

export default userRouter;
