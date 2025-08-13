import { validationResult } from "express-validator";
import Category from "../models/category.model.js";
import { jsendSuccess } from "../utils/jsend.js";
import AppError from "../utils/appError.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const addCategory = asyncWrapper(async (req, res) => {
  const { title, visibility } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }
  const category = new Category({
    title,
    thumbnail: req.file.filename,
    visibility,
  });
  const savedCategory = await category.save();
  return jsendSuccess(res, { category: savedCategory }, 201);
});

const getCategories = asyncWrapper(async (req, res) => {
  const categories = await Category.find(
    {},
    { __v: 0, createdAt: 0, updatedAt: 0 }
  );
  return jsendSuccess(res, { categories });
});

const getCategoryById = asyncWrapper(async (req, res) => {
  const category = await Category.findById(req.params.id, {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }
  return jsendSuccess(res, { category });
});

const updateCategory = asyncWrapper(async (req, res) => {
  
  
  const { title, visibility } = req.body;
  console.log("Updating with data:", { title, visibility });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { title, visibility },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return jsendSuccess(res, { category });
});

export { addCategory, getCategories, getCategoryById, updateCategory };
