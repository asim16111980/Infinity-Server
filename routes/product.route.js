import express from "express";
import {
  createProductRules,
  updateProductRules,
} from "../middlewares/validation/product.validation.js";
const router = express.Router();
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { validateRequest } from "../middlewares/validation/validateRequest .js";

router
  .route("/")
  .get(getProducts)
  .post(createProductRules, validateRequest, addProduct);
router
  .route("/:id")
  .get(getProductById)
  .patch(updateProductRules, validateRequest, updateProduct)
  .delete(deleteProduct);

export default router;
