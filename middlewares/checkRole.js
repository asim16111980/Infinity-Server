export const checkRole = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.currentUser.role)) {
        return res.status(403).json({
          status: "fail",
          message: "You are not authorized to perform this action",
        });
      }
      next();
    };
  };
  