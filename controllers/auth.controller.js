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

  // const payload = {
  //   id: newUser._id,
  //   email: newUser.email,
  //   role: newUser.role,
  // };
  // const authToken = generateJWT(payload);

  const savedUser = await newUser.save();

  req.user = savedUser;
  // return jsendSuccess(
  //   res,
  //   { authToken, expiresIn: process.env.JWT_EXPIRES_IN },
  //   201
  // );
});

const login = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }

  const { email, password } = req.body;

  let foundUser;
  if (email !== "") {
    foundUser = await User.findOne({ email: email });
  }

  if (!foundUser) {
    throw new AppError("Invalid credentials", 401);
  }

  const matchedPassword = await bcrypt.compare(password, foundUser.password);
  if (!matchedPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  req.user = foundUser;
  // const payload = {
  //   id: foundUser._id,
  //   email: foundUser.email,
  //   role: foundUser.role,
  // };

  // const authToken = generateJWT(payload);

  // const day = 1000 * 60 * 60 * 24;
  // const sessionMaxAge = { short: day, long: day * 7 };
  // req.session.cookie.maxAge = req.body.remember
  //   ? sessionMaxAge.long
  //   : sessionMaxAge.short;
  // req.session.user = payload;

  // req.session.save((err) => {
  //   if (err) return next(err);

  //   return jsendSuccess(res, {
  //     authToken,
  //     expiresIn: process.env.JWT_EXPIRES_IN,
  //   });
  // });
});

const refreshToken = (req, res, next) => {
  const authToken = generateJWT(req.session.user);

  return jsendSuccess(res, {
    authToken,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const verifySession = (req, res, next) => {
  return jsendSuccess(res, { user: req.session.user });
};

export { register, login, refreshToken, verifySession };
// facebookId 1334636261553110
// facebook secret 0dff63bc8d7b8c1ae23aee9fc3c20698
