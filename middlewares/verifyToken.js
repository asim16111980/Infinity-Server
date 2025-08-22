import { jwt } from "jsonwebtoken";
import AppError from "../utils/appError";

export const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader) {
    throw new AppError("token is required", 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    throw new AppError(err.message, 401);
  }
};
