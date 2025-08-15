import { body } from "express-validator";

const baseProductRules = {
  name: body("name").isString().withMessage("Name must be a string").trim(),

  desc: body("desc")
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  price: body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number >= 0"),

  categories: body("categories")
    .toArray()
    .isArray()
    .withMessage("Categories must be an array")
    .custom((arr) => arr.every((cat) => typeof cat === "string"))
    .trim(),
  
  imagesFolder: body("imagesFolder")
    .isString()
    .withMessage("Images folder must be a string")
    .trim(),

  rating: body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),

  reviews: body("reviews")
    .optional()
    .toArray()
    .isArray()
    .withMessage("Reviews must be an array"),

  reviewUser: body("reviews.*.user")
    .optional()
    .isMongoId()
    .withMessage("Review user must be a valid Mongo ID"),

  reviewComment: body("reviews.*.comment")
    .optional()
    .isString()
    .withMessage("Review comment must be a string")
    .notEmpty()
    .withMessage("Review comment is required"),

  reviewRating: body("reviews.*.rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Review rating must be between 0 and 5"),

  options: body("options")
    .optional()
    .toArray()
    .isArray()
    .withMessage("Options must be an array of arrays")
    .custom((options) =>
      options.every(
        (opt) => Array.isArray(opt) && opt.every((o) => typeof o === "string")
      )
    )
    .withMessage("Each option must be an array of strings"),

  stock: body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be an integer >= 0"),

  discount: body("discount")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount must be between 0 and 100"),
};

export const createProductRules = [
  baseProductRules.name.notEmpty().withMessage("Name is required"),
  baseProductRules.desc.notEmpty().withMessage("Description is required"),
  baseProductRules.price.notEmpty().withMessage("Price is required"),
  baseProductRules.categories.notEmpty().withMessage("Categories are required"),
  baseProductRules.rating,
  baseProductRules.reviews,
  baseProductRules.reviewUser,
  baseProductRules.reviewComment,
  baseProductRules.reviewRating,
  baseProductRules.options,
  baseProductRules.stock.notEmpty().withMessage("Stock is required"),
  baseProductRules.discount,
];

export const updateProductRules = [
  baseProductRules.name.optional(),
  baseProductRules.desc.optional(),
  baseProductRules.price.optional(),
  baseProductRules.categories.optional(),
  baseProductRules.rating,
  baseProductRules.reviews,
  baseProductRules.reviewUser,
  baseProductRules.reviewComment,
  baseProductRules.reviewRating,
  baseProductRules.options,
  baseProductRules.stock.optional(),
  baseProductRules.discount,
];
