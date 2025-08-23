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
import configureImageUpload from "../middlewares/configureImageUpload.js";
import upload from "../middlewares/uploadImage.js";
import { checkImages } from "../middlewares/validation/checkImages.js";
import { validateRequest } from "../middlewares/validation/validateRequest.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { checkRole } from "../middlewares/checkRole.js";
import { USER_ROLES } from "../utils/userRoles.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    verifyToken,
    checkRole(USER_ROLES.ADMIN),
    configureImageUpload("products", "name", true),
    upload.array("productImages", 12),
    checkImages,
    createProductRules,
    validateRequest,
    addProduct
);
  
router
  .route("/:id")
  .get(getProductById)
  .patch(
    configureImageUpload("products", "name", true),
    upload.array("productImages", 12),
    updateProductRules,
    validateRequest,
    updateProduct
  )
  .delete(deleteProduct);

export default router;
