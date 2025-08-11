import express from "express";
import { createProductRules, updateProductRules} from "../middlewares/validation/product.validation.js";
const router = express.Router();
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

router.route("/").get(getProducts).post(createProductRules, addProduct);
router
  .route("/:id")
  .get(getProductById)
  .patch(updateProductRules, updateProduct)
  .delete(deleteProduct);

export default router;
