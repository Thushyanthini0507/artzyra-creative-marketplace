import express from "express";
import {
  createPayment,
  deletePayment,
  getAllPayment,
  getPaymentById,
  updatePayment,
} from "../controllers/paymentController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const PaymentRouter = express.Router();

// All payment routes require admin access
PaymentRouter.get("/", protect, adminOnly, getAllPayment);
PaymentRouter.get("/:id", protect, adminOnly, getPaymentById);
PaymentRouter.post("/", protect, adminOnly, createPayment);
PaymentRouter.put("/:id", protect, adminOnly, updatePayment);
PaymentRouter.delete("/:id", protect, adminOnly, deletePayment);

export default PaymentRouter;
