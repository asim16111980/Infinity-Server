import { body } from "express-validator";

const baseUserRules = {
  name: body("name")
    .notEmpty()
    .withMessage("Your name is required")
    .bail()
    .isString()
    .withMessage("Your name must be a string")
    .trim(),

  username: body("username")
    .notEmpty()
    .withMessage("User name is required")
    .bail()
    .isString()
    .withMessage("User name must be a string")
    .trim(),

  email: body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email")
    .trim(),

  password: body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .trim(),

  firstName: body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string")
    .trim(),

  lastName: body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string")
    .trim(),

  billingAddress: {
    fullName: body("billingAddress.fullName")
      .optional()
      .isString()
      .withMessage("Full name must be a string")
      .trim(),

    country: body("billingAddress.country")
      .optional()
      .isString()
      .withMessage("Country must be a string")
      .trim(),

    city: body("billingAddress.city")
      .optional()
      .isString()
      .withMessage("City must be a string")
      .trim(),

    street: body("billingAddress.street")
      .optional()
      .isString()
      .withMessage("Street must be a string")
      .trim(),

    zipCode: body("billingAddress.zipCode")
      .optional()
      .isString()
      .withMessage("Zip code must be a string")
      .trim(),

    phoneNumber: body("billingAddress.phoneNumber")
      .optional()
      .isString()
      .withMessage("Phone number must be a string")
      .trim(),
  },
};

// Register rules
export const registerUserRules = [
  baseUserRules.name,
  baseUserRules.username,
  baseUserRules.email,
  baseUserRules.password,
];

// Login rules
export const loginUserRules = [
  baseUserRules.username.optional(),
  baseUserRules.email.optional(),
  baseUserRules.password,
];
