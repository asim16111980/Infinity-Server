import { body } from "express-validator";

const baseCategoryRules = {
  title: body("title").isString().withMessage("Name must be a string").trim(),

  thumbnail: body("thumbnail")
    .isString()
    .withMessage("Thumbnail must be a string")
    .trim(),

  visibility: body("visibility")
    .isBoolean()
    .withMessage("Visibility must be a boolean"),
};

export const createCategoryRules = [
  baseCategoryRules.title.notEmpty().withMessage("Title is required"),
  baseCategoryRules.thumbnail,
  baseCategoryRules.visibility,
];

export const updateCategoryRules = [
  baseCategoryRules.title.optional(),
  baseCategoryRules.thumbnail.optional(),
  baseCategoryRules.visibility.optional(),
];
