import asyncWrapper from "./asyncWrapper.js";
import AppError from "../utils/appError.js";

export const checkRole = (...roles) => {
  return asyncWrapper(async (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      throw new AppError("You are not authorized to perform this action", 403);
    }
    next();
  });
};
