export const checkImages = (req, res, next) => {
  const hasSingleFile = !!req.file;
  const hasMultipleFiles = Array.isArray(req.files) && req.files.length > 0;

  if (!hasSingleFile && !hasMultipleFiles) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  next();
};
