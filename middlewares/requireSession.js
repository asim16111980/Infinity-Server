import AppError from "../utils/appError.js";

export function requireSession(req, res, next) {
  if (!req.session || !req.session.user) {
    return next(new AppError("No session found", 401));
  }
  // next();
}
