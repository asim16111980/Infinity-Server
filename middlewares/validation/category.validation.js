import { body } from "express-validator";

const baseCategoryRules = {
  name: body("name")
    .optional()
    .isString().withMessage("Name must be a string").bail()
    .trim(),

  visibility: body("visibility")
    .optional()
    .toBoolean()
    .isBoolean().withMessage("Visibility must be a boolean").bail(),
};

export const createCategoryRules = [
  baseCategoryRules.name.notEmpty().withMessage("Name is required"),
  baseCategoryRules.visibility.notEmpty().withMessage("Visibility is required"),
];

export const updateCategoryRules = [
  baseCategoryRules.name,
  baseCategoryRules.visibility,
];
