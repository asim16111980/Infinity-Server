import { validationResult } from "express-validator";
import Product from "../models/product.model.js";
import { jsendSuccess } from "../utils/jsend.js";
import AppError from "../utils/appError.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const addProduct = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }
  const product = new Product({title,desc,price,options,images:req.file.filename,discount,categories});
  const savedProduct = await product.save();
  return jsendSuccess(res, { product: savedProduct }, 201);
});

const getProducts = asyncWrapper(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const products = await Product.find({}, { __v: 0 }).limit(limit).skip(skip);
  return jsendSuccess(res, { products });
});

const getProductById = asyncWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return jsendSuccess(res, { product });
});

const updateProduct = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }

  if (req.body.SKU) {
    throw new AppError("Cannot update SKU", 400);
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return jsendSuccess(res, { product });
});

const deleteProduct = asyncWrapper(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return jsendSuccess(res, { product });
});

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
