import mongoose from "mongoose";
import Product from "../models/product_model.js";

// check the product data sent by the frontend
// it returns an error message, or empty text "" if everything is fine
const checkProduct = (data) => {
  if (typeof data.title !== "string" || data.title.trim() === "") {
    return "Title is required !";
  }

  if (data.price === "" || data.price === undefined || data.price === null) {
    return "Price is required !";
  }

  if (isNaN(Number(data.price)) || Number(data.price) < 0) {
    return "Price must be a number and 0 or more !";
  }

  // stock is optional, if it is empty we will save 0
  if (data.stock !== "" && data.stock !== undefined && data.stock !== null) {
    if (!Number.isInteger(Number(data.stock)) || Number(data.stock) < 0) {
      return "Stock must be a whole number and 0 or more !";
    }
  }

  return "";
};

// take only the fields we allow from req.body and make the numbers real numbers
const getProductData = (body) => {
  let stock = 0;
  if (body.stock !== "" && body.stock !== undefined && body.stock !== null) {
    stock = Number(body.stock);
  }

  return {
    title: body.title.trim(),
    description: body.description,
    price: Number(body.price),
    category: body.category,
    image: body.image,
    stock: stock,
  };
};

// create product
export const createProduct = async (req, res) => {
  try {
    const message = checkProduct(req.body);
    if (message) {
      return res.status(400).json({ message });
    }

    const product = await Product.create(getProductData(req.body));
    res.status(201).json({
      message: "Product added successfully !",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error !" });
  }
};

// get all product

export const getProduct = async (req, res) => {
  try {
    // to get the product we have to find the product
    const products = await Product.find().sort({ createdAt: -1 }); // data sort hoke aayega
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error !" });
  }
};

// get one product by id
export const getSingleProduct = async (req, res) => {
  try {
    // if the id is not a valid mongodb id, stop here
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id !" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found !" });
    }

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error !" });
  }
};

// update Product
export const updateProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id !" });
    }

    const message = checkProduct(req.body);
    if (message) {
      return res.status(400).json({ message });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      getProductData(req.body),
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found !" });
    }

    res.json({
      message: "Product updated successfully !",
      updatedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error !" });
  }
};

// delete Product
export const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id !" });
    }

    const deleted = await Product.findByIdAndDelete(req.params.id);

    // check first, then send the success message
    if (!deleted) {
      return res.status(404).json({ message: "Product not found !" });
    }

    res.json({ message: "Product deleted successfully !", deleted });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error !" });
  }
};
