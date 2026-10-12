import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/product_controller.js";

const router = express.Router();

router.post("/add", createProduct); // create
router.get("/", getProduct); // get all product
router.get("/:id", getSingleProduct); // get one product
router.put("/update/:id", updateProduct); // update product
router.delete("/delete/:id", deleteProduct); // delete product

export default router;
