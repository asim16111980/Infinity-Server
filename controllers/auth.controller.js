import { validationResult } from "express-validator";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import AppError from "../utils/appError.js";
import { jsendSuccess } from "../utils/jsend.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const register = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }

  const { name, username, email, password } = req.body;
  let oldUser = await User.findOne({ username });
  if (oldUser) {
    throw new AppError("User with this username already exists", 400);
  } else {
    oldUser = await User.findOne({ email });
    if (oldUser) {
      throw new AppError("User with this email already exists", 400);
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatar = req.file?.filename || "";
  const updateData = {
    name,
    username,
    email,
    hashedPassword,
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

const login = asyncWrapper(async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }

  const { username, email, password } = req.body;
  if (username !== "") {
    
  }
})

export { register,login };
