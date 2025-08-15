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
import upload from "../utils/uploadImage.js";
import { validateRequest } from "../middlewares/validation/validateRequest.js";
import { checkImages } from "../middlewares/validation/checkImages.js";
import configureImageUpload from "../middlewares/configureImageUpload.js";

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(
    createCategoryRules,
    validateRequest,
    configureImageUpload("categories", "name"),
    upload.single("thumbnail"),
    checkImages,
    addCategory
  );

router
  .route("/:id")
  .get(getCategoryById)
  .patch(
    updateCategoryRules,
    validateRequest,
    configureImageUpload("categories", "name"),
    upload.single("thumbnail"),
    updateCategory
  );

export default router;
