import express from "express";
import {
  createCategoryRules,
  updateCategoryRules,
} from "../middlewares/validation/category.validation.js";
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import upload from "../middlewares/uploadImage.js";
import { validateRequest } from "../middlewares/validation/validateRequest.js";
import { checkImages } from "../middlewares/validation/checkImages.js";
import configureImageUpload from "../middlewares/configureImageUpload.js";

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(
    configureImageUpload("categories", "name"),
    checkImages,
    upload.single("thumbnail"),
    createCategoryRules,
    validateRequest,
    addCategory
  );

router
  .route("/:id")
  .get(getCategoryById)
  .patch(
    configureImageUpload("categories", "name"),
    upload.single("thumbnail"),
    updateCategoryRules,
    validateRequest,
    updateCategory
  );

export default router;
