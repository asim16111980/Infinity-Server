import { validationResult } from "express-validator";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import AppError from "../utils/appError.js";
import { jsendSuccess } from "../utils/jsend.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../utils/generateJWT.js";
import * as authService from "../services/auth.service.js";

const register = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }

  // const payload = {
  //   id: newUser._id,
  //   email: newUser.email,
  //   role: newUser.role,
  // };
  // const authToken = generateJWT(payload);

  req.user = await authService.registerUser(req);
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

  req.user = authService.loginUser(req);
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

const refreshToken = async (req, res, next) => {
  const authToken = generateJWT(req.session.user);

  return jsendSuccess(res, {
    authToken,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const verifySession = async (req, res, next) => {
  return jsendSuccess(res, { user: req.session.user });
};

const resetPassword = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }
  
  const link =await authService.requestPasswordReset(req);

  return jsendSuccess(res, link);
});

export { register, login, refreshToken, verifySession, resetPassword };
