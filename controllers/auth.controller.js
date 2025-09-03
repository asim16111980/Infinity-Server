import { validationResult } from "express-validator";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import AppError from "../utils/appError.js";
import { jsendSuccess } from "../utils/jsend.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../utils/generateJWT.js";

const register = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }

  const { email, password, role } = req.body;

  let oldUser = await User.findOne({ email });
  if (oldUser) {
    throw new AppError("User with this email already exists", 400);
  }

  const newData = { email, role };
  const hashedPassword = await bcrypt.hash(password, 10);
  newData.password = hashedPassword;
  newData.uploadPath = req.uploadPath;

  const avatar = req.file?.filename || "";
  if (avatar) {
    newData.avatar = avatar;
  }

  const newUser = new User(newData);

  const payload = {
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
  };
  const token = generateJWT(payload);

  newUser.token = token;

  const savedUser = await newUser.save();
  return jsendSuccess(res, { user: savedUser }, 201);
});

const login = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }

  const { email, password } = req.body;

  let foundUser;
  if (email !== "") {
    foundUser = await User.findOne({ email });
  }

  if (!foundUser) {
    throw new AppError("Invalid credentials", 401);
  }

  const matchedPassword = await bcrypt.compare(password, foundUser.password);
  if (!matchedPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const payload = {
    id: foundUser._id,
    email: foundUser.email,
    role: foundUser.role,
  };

  const authToken = generateJWT(payload);

  const sessionPayload = { userId: foundUser._id, role: foundUser.role };
  req.session.user = sessionPayload;

res.cookie("authToken", authToken, {
  httpOnly: true,   
  secure: process.env.NODE_ENV === "production", 
  sameSite: "lax",
});

  return jsendSuccess(res, { authToken: authToken });
});

export { register, login };
