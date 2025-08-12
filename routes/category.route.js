import express from "express";
import {
  createProductRules,
  updateProductRules,
} from "../middlewares/validation/product.validation.js";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { validateRequest } from "../middlewares/validation/validateRequest .js";
import multer from "multer";
import { diskStorage, fileFilter } from "../utils/uploadImage.js";

const upload = multer({ storage: diskStorage, fileFilter });
const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    createProductRules,
    validateRequest,
    upload.array("uploads", 12),
    addProduct
  );
router
  .route("/:id")
  .get(getProductById)
  .patch(updateProductRules, validateRequest, updateProduct)
  .delete(deleteProduct);

export default router;
