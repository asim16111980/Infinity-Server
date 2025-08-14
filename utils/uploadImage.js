import multer from "multer";
import path from "path";
import AppError from "../utils/appError.js";

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    let prefix;
    if (req.imageField && req.body[req.imageField]) {
      prefix = req.body[req.imageField];
    } else {
      prefix = req.body.name || "image";
    }

    const safePrefix = String(prefix).replace(/\s+/g, "-").toLowerCase();
    cb(null, `${safePrefix}-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExt = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (file.mimetype.startsWith("image/") && allowedExt.includes(ext)) {
    cb(null, true);
  } else {
    cb(new AppError("File must be a valid image format", 400), false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter });

export default upload;
