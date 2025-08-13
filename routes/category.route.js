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
import { validateRequest } from "../middlewares/validation/validateRequest.js";
import multer from "multer";
import { diskStorage, fileFilter } from "../utils/uploadImage.js";

const upload = multer({ storage: diskStorage, fileFilter });
const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(
    upload.single("thumbnail"),
    createCategoryRules,
    validateRequest,
    addCategory
  );
router
  .route("/:id")
  .get(getCategoryById)
  .patch(updateCategoryRules, validateRequest, updateCategory);

export default router;
