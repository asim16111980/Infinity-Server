import { v4 as uuidv4 } from "uuid";
import path from "path";

const configureImageUpload =
  (folderName, fieldName, useSubFolders = false) =>
  (req, res, next) => {
    req.imageUploadFieldName = fieldName;
    req.useSubFoldersForImages = useSubFolders;
    req.uniquePrefix = uuidv4();
    req.uploadPath = path.join("uploads", folderName);
    next();
  };

export default configureImageUpload;
