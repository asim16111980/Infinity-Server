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
import upload from "../utils/uploadImage.js";
import { validateRequest } from "../middlewares/validation/validateRequest.js";
import { checkImages } from "../middlewares/validation/checkImages.js";
import configureImageUpload from "../middlewares/configureImageUpload.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    createProductRules,
    validateRequest,
    configureImageUpload("products", "name", true),
    upload.array("productImages", 12),
    checkImages,
    addProduct
  );
router
  .route("/:id")
  .get(getProductById)
  .patch(
    updateProductRules,
    validateRequest,
    configureImageUpload("products", "name", true),
    upload.array("productImages", 12),
    updateProduct
  )
  .delete(deleteProduct);

export default router;
