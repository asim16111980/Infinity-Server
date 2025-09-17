import asyncWrapper from "./asyncWrapper";
import AppError from "../utils/appError";
import { generateJWT } from "../utils/generateJWT";
import { jsendSuccess } from "../utils/jsend";

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
  req.session.cookie.maxAge = req.body.remember
    ? sessionMaxAge.long
    : sessionMaxAge.short;
  req.session.user = payload;

  req.session.save((err) => {
    if (err) return next(err);

    return jsendSuccess(
      res,
      {
        authToken,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      res.status
    );
  });
});
export default finalizeAuth;
