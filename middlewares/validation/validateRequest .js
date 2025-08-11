import { validationResult } from "express-validator";
import { jsendFail } from "../utils/jsend.js";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return jsendFail(res, { errors: errors.array() }, 400);
  }
  next();
};
