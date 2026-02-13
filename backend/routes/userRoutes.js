import express from "express";

// AUTH CONTROLLER
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  logoutUser
} from "../controllers/authController.js";

// USER CONTROLLER
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addAddress,
  deleteAddress,
  setDefaultAddress,
  addToWishlist,
  removeFromWishlist
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// =========================
// AUTH ROUTES
// =========================
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);
router.post("/logout", protect, logoutUser);

// =========================
// USER ADDRESS ROUTES
// =========================
router.post("/address", protect, addAddress);
router.delete("/address/:addressId", protect, deleteAddress);
router.put("/address/default/:addressId", protect, setDefaultAddress);

// =========================
// USER WISHLIST ROUTES
// =========================
router.post("/wishlist", protect, addToWishlist);
router.delete("/wishlist/:productId", protect, removeFromWishlist);

// =========================
// ADMIN USER MANAGEMENT
// =========================
router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;