import express from "express";
import {
  createOrder,
  getUserOrder,
  updateOrderStatus,
  deleteOrder,
  getAllOrders
} from "../controllers/orderController.js";
import Order from "../models/Order.js";

const router = express.Router();

// ADMIN: Get all orders

// ADMIN: Get all orders
router.get("/", getAllOrders);

// USER: Get orders by userId
router.get("/user/:userId", getUserOrder);

// Create order
router.post("/", createOrder);

// Update order status
router.put("/:id", updateOrderStatus);

// Delete order
router.delete("/:id", deleteOrder);

export default router;