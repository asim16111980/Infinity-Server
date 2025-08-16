import { v4 as uuidv4 } from 'uuid';
const configureImageUpload =
  (folderName, fieldName, useSubFolders = false) =>
  (req, res, next) => {
    req.imageUploadFolderName = folderName;
    req.imageUploadFieldName = fieldName;
    req.useSubFoldersForImages = useSubFolders;
    req.uniquePrefix = uuidv4();
    next();
  };

export default configureImageUpload;
