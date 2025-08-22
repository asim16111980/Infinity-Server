import { validationResult } from "express-validator";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import AppError from "../utils/appError.js";
import { jsendSuccess } from "../utils/jsend.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { jwt } from "jsonwebtoken";

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

  const newData = { name, username, email };
  const hashedPassword = await bcrypt.hash(password, 10);
  newData.password = hashedPassword;
  newData.uploadPath = req.uploadPath;

  const avatar = req.file?.filename || "";
  if (avatar) {
    newData.avatar = avatar;
  }

  const newUser = new User(newData);

  const payload = { id: newUser._id, name: newUser.name };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,{expiresIn:});

  newUser.token = token;

  const savedUser = await newUser.save();
  return jsendSuccess(res, { user: savedUser }, 201);
});

const login = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }

  const { username, email, password } = req.body;

  let foundUser;
  if (username !== "") {
    foundUser = await User.findOne({ username });
  } else {
    foundUser = await User.findOne({ email });
  }

  const matchedPassword = await bcrypt.compare(password, foundUser.password);

  if (foundUser && matchedPassword) {
    return jsendSuccess(res, { user: foundUser }, 200);
  } else {
    throw new AppError("error", 500);
  }
});

export { register, login };
