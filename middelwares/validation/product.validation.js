import { body } from "express-validator";

export const productValidationRules = [
  body("SKU")
    .isString().withMessage("SKU must be a string")
    .trim()
    .notEmpty().withMessage("SKU is required"),

  body("name")
    .isString().withMessage("Name must be a string")
    .trim()
    .notEmpty().withMessage("Name is required"),

  body("desc")
    .isString().withMessage("Description must be a string")
    .trim()
    .notEmpty().withMessage("Description is required"),

  body("price")
    .isFloat({ min: 0 }).withMessage("Price must be a number greater than or equal to 0"),

  body("category")
    .isString().withMessage("Category must be a string")
    .trim()
    .notEmpty().withMessage("Category is required"),

  body("images")
    .isArray({ min: 1 }).withMessage("At least one image is required")
    .custom((arr) => arr.every((url) => typeof url === "string"))
    .withMessage("All images must be strings"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 }).withMessage("Rating must be between 0 and 5"),

  body("reviews")
    .optional()
    .isArray().withMessage("Reviews must be an array"),

  body("reviews.*.user")
    .optional()
    .isMongoId().withMessage("Review user must be a valid Mongo ID"),

  body("reviews.*.comment")
    .optional()
    .isString().withMessage("Review comment must be a string")
    .notEmpty().withMessage("Review comment is required"),

  body("reviews.*.rating")
    .optional()
    .isFloat({ min: 0, max: 5 }).withMessage("Review rating must be between 0 and 5"),

  body("options")
    .optional()
    .isArray().withMessage("Options must be an array of arrays")
    .custom((options) => options.every((opt) => Array.isArray(opt) && opt.every((o) => typeof o === "string")))
    .withMessage("Each option must be an array of strings"),

  body("stock")
    .isInt({ min: 0 }).withMessage("Stock must be an integer greater than or equal to 0"),

  body("discount")
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage("Discount must be between 0 and 100"),
];
