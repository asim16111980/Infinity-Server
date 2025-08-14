import { body } from "express-validator";

const baseCategoryRules = {
  name: body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim(),

  visibility: body("visibility")
    .optional()
    .toBoolean()
    .isBoolean()
    .withMessage("Visibility must be a boolean"),
};

export const createCategoryRules = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim(),

  body("visibility")
    .notEmpty()
    .withMessage("Visibility is required")
    .toBoolean()
    .isBoolean()
    .withMessage("Visibility must be a boolean"),
];

export const updateCategoryRules = [
  baseCategoryRules.name,
  baseCategoryRules.visibility,
];
