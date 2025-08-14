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
import setImageField from "../middlewares/setImageField.js";

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(
    setImageField("name"),
    upload.single("thumbnail"),
    checkImages,
    createCategoryRules,
    validateRequest,
    addCategory
  );

router
  .route("/:id")
  .get(getCategoryById)
  .patch(
    setImageField("name"),
    upload.single("thumbnail"),
    updateCategoryRules,
    validateRequest,
    updateCategory
  );

export default router;
