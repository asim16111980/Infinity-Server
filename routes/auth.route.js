import express from "express";
import configureImageUpload from "../middleware/configureImageUpload.js";
import upload from "../middleware/upload.js";
import { checkImage } from "../controllers/auth.controller.js";
import { registerUserRules } from "../middlewares/validation/user.validation.js";
import { validateRequest } from "../middlewares/validation/validateRequest.js";

const router = express.Router();

router
  .route("/register")
  .post(
    configureImageUpload("users", "name"),
    upload.single("avatar"),
    checkImage,
    registerUserRules,
    validateRequest,
    register
  );

export default router;
