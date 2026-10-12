
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Product from "./models/product_model.js";

dotenv.config();

const sampleProducts = [
  { title: "Running Shoes", price: 1999, category: "Shoes", stock: 25, description: "Light and comfortable shoes for daily running." },
  { title: "Casual Sneakers", price: 1499, category: "Shoes", stock: 18, description: "Everyday sneakers that go with any outfit." },
  { title: "Leather Formal Shoes", price: 2999, category: "Shoes", stock: 10, description: "Classic formal shoes for office and events." },
  { title: "Cotton T-Shirt", price: 499, category: "Clothing", stock: 60, description: "Soft 100% cotton t-shirt." },
  { title: "Denim Jeans", price: 1299, category: "Clothing", stock: 30, description: "Slim fit denim jeans." },
  { title: "Hooded Sweatshirt", price: 1199, category: "Clothing", stock: 22, description: "Warm hoodie with front pocket." },
  { title: "Wireless Earbuds", price: 1799, category: "Electronics", stock: 40, description: "Bluetooth earbuds with charging case." },
  { title: "Bluetooth Speaker", price: 2499, category: "Electronics", stock: 15, description: "Portable speaker with deep bass." },
  { title: "Smart Watch", price: 3499, category: "Electronics", stock: 12, description: "Fitness tracking smart watch." },
  { title: "Backpack", price: 999, category: "Accessories", stock: 35, description: "Water resistant backpack with laptop pocket." },
  { title: "Sunglasses", price: 799, category: "Accessories", stock: 3, description: "UV protected sunglasses." },
  { title: "Leather Wallet", price: 599, category: "Accessories", stock: 0, description: "Slim leather wallet." },
  { title: "Water Bottle", price: 349, category: "Home", stock: 80, description: "1 litre steel water bottle." },
  { title: "Desk Lamp", price: 899, category: "Home", stock: 20, description: "LED desk lamp with 3 brightness levels." },
];

const seed = async () => {
  try {
    await connectDB();

    const count = await Product.countDocuments();
    if (count > 0) {
      console.log(`Products already exist (${count}), nothing added.`);
      return;
    }

    // placeholder pictures that show the product name
    const products = sampleProducts.map((product) => ({
      ...product,
      image: `https://placehold.co/600x400?text=${encodeURIComponent(product.title)}`,
    }));

    await Product.insertMany(products);
    console.log(`${products.length} sample products added !`);
  } catch (error) {
    console.log("Something went wrong !", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
