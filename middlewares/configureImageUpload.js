const configureImageUpload =
  (folderName, fieldName, useSubFolders = false) =>
  (req, res, next) => {
    req.imageUploadFolderName = folderName;
    req.imageUploadFieldName = fieldName;
    req.useSubFoldersForImages = useSubFolders;
    next();
  };

export default configureImageUpload;
