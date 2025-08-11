import { validationResult } from "express-validator";
import Product from "../models/product.model.js";
import httpStatusText from "../utils/httpStatusText.js";

const addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: savedProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: httpStatusText.FAIL, data: null });
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { product } });
  } catch (err) {
    res
      .status(500)
      .json({
        status: httpStatusText.ERROR,
        message: err.message,
        data: null,
        code: 500,
      });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (req.body.SKU) {
      return res.status(400).json({ message: "SKU cannot be updated" });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.deleteOne(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
