import express from "express";
//import upload from "../middleware/multerMiddleware.js";
import upload from "../middleware/multerCloudinary.js";

import {
  createProduct,
  updateProduct,
  getAllProduct
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", upload.array("images", 10), createProduct);
router.put("/:id", upload.array("images", 10), updateProduct);
router.get("/", getAllProduct);

export default router;