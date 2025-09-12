import express from "express";
import configureImageUpload from "../middlewares/configureImageUpload.js";
import upload from "../middlewares/uploadImage.js";
import {
  loginUserRules,
  registerUserRules,
} from "../middlewares/validation/user.validation.js";
import { validateRequest } from "../middlewares/validation/validateRequest.js";
import {
  register,
  login,
  refreshToken,
  verifySession,
} from "../controllers/auth.controller.js";
import { requireSession } from "../middlewares/requireSession.js";

const router = express.Router();

router
  .route("/register")
  .post(
    configureImageUpload("users", "name"),
    upload.single("avatar"),
    registerUserRules,
    validateRequest,
    register
  );

router
  .route("/login")
  .post(upload.none(), loginUserRules, validateRequest, login);

router.route("/refresh").post(requireSession, refreshToken);

router.route("/verify").get(requireSession, verifySession);
export default router;
