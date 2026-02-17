import express from "express";
import {
  createOrder,
  getUserOrder,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";
import Order from "../models/Order.js";

const router = express.Router();

// ADMIN: Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId")
      .populate("items.variantId");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// USER: Get orders by userId
router.get("/user/:userId", getUserOrder);

// Create order
router.post("/", createOrder);

// Update order status
router.put("/:id", updateOrderStatus);

// Delete order
router.delete("/:id", deleteOrder);

export default router;