export const checkImages = (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "Thumbnail is required" });
    }
    next();
  };
  