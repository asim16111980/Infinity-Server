import multer from "multer";
import path from "path";
import AppError from "../utils/appError.js";
import fs from "fs";

const safePrefix = (req) => {
  const prefix = req.body[req.imageUploadFieldName] || req.body.name || "image";
  return String(prefix).replace(/\s+/g, "-").toLowerCase();
};

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (req.useSubFoldersForImages) {
      req.uploadPath =
        path.join(req.uploadPath, safePrefix(req)) + `-${req.uniquePrefix}`;
    }

    fs.mkdirSync(req.uploadPath, { recursive: true });
    cb(null, req.uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${safePrefix(req)}-${Date.now()}${ext}`);
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
