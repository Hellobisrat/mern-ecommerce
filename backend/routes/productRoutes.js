import express from "express";
import upload from "../middleware/multerCloudinary.js";
import { createProduct, updateProduct, getAllProduct,getSingleProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/", upload.array("images", 10), createProduct);
router.put("/:id", upload.array("images", 10), updateProduct);
router.get("/", getAllProduct);
router.get("/:id", getSingleProduct);

export default router;