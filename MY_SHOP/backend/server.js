import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/auth_Routes.js";
import productRoutes from "./routes/product_Routes.js";
import orderRoutes from "./routes/order_Routes.js";

dotenv.config(); // to connect with the (env)ironment

const app = express();

app.use(cors()); // to communicate with frontend
app.use(express.json()); // jo data aayega use json formate me lane ke liye
app.use("/api/auth", authRoutes); // to use the auth routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// route for testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started successfully ! PORT : ${PORT}`);
});
