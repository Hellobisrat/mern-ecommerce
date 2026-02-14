import express from "express";
import cors from 'cors';
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes  from './routes/cartRoute.js'
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoute.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";
import Stripe from "stripe";


import dotenv from "dotenv";
dotenv.config();



const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use(errorHandler);

console.log("Cloudinary connected as:", cloudinary.config().cloud_name);


app.listen(5000, () => {
  connectDB();
  console.log("Server running on port 5000")
});