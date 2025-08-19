import { validationResult } from "express-validator";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import AppError from "../utils/appError.js";
import { jsendSuccess } from "../utils/jsend.js";
import User from "../models/user.model.js";

const register = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }

  const { name, userName, email, password } = req.body;
  const avatar = req.file?.filename || "";
  const updateData = {
    name,
    userName,
    email,
    password,
    avatar,
  };

  if (avatar) {
    updateData.avatar = avatar;
    updateData.uploadPath = req.uploadPath;
  }

  const user = new User(updateData);

  const savedUser = await user.save();
  return jsendSuccess(res, { user: savedUser }, 201);
});

export { register };
