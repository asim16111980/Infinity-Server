import asyncWrapper from "./asyncWrapper.js";
import AppError from "../utils/appError.js";
import { generateJWT } from "../utils/generateJWT.js";
import { jsendSuccess } from "../utils/jsend.js";

const finalizeAuth = asyncWrapper(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    throw new AppError("User not found", 400);
  }

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const authToken = generateJWT(payload);

  const day = 1000 * 60 * 60 * 24;
  const sessionMaxAge = { short: day, long: day * 7 };
  const remember = req.body?.remember || false;

  req.session.cookie.maxAge = remember ? sessionMaxAge.long : sessionMaxAge.short;
  req.session.user = payload;

  req.session.save((err) => {
    if (err) return next(err);

    return jsendSuccess(res, {
      authToken,
      expiresIn: process.env.JWT_EXPIRES_IN,
    }, res.statusCode ||200);
  });
});

export default finalizeAuth;