const setImageField = (fieldName) => (req, res, next) => {
  req.imageField = fieldName;
  next();
};

export default setImageField;
