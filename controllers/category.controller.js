import { validationResult } from "express-validator";
import Category from "../models/category.model.js";
import { jsendSuccess } from "../utils/jsend.js";
import AppError from "../utils/appError.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const addCategory = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }
  const { name, visibility } = req.body;
  const thumbnail = req.file?.filename || "";
  const newData = {
    name,
    visibility,
  };

  if (thumbnail) {
    newData.thumbnail = thumbnail;
    newData.uploadPath = req.uploadPath;
  }

  const category = new Category(newData);
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }

  const id = req.params.id;
  const { name, visibility } = req.body;
  const thumbnail = req.file?.filename || "";
  const updateData = {
    name,
    visibility,
  };

  if (thumbnail) {
    updateData.thumbnail = thumbnail;
    updateData.uploadPath = req.uploadPath;
  }

  const category = await Category.findByIdAndUpdate(req.params.id, updateData, {
    runValidators: true,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  if (req.file) {
    const oldUploadPath = category.uploadPath;
    const oldThumbnail = category.thumbnail;
    await removePath(oldUploadPath, oldThumbnail);
  }

  return jsendSuccess(res, { category });
});

export { addCategory, getCategories, getCategoryById, updateCategory };
