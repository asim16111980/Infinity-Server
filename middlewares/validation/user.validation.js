import { body } from "express-validator";

const baseUserRules = {
  name: body("name")
    .isString()
    .withMessage("Your name must be a string")
    .trim(),

  userName: body("userName")
    .isString()
    .withMessage("User name must be a string")
    .trim(),

  email: body("email").isEmail().withMessage("Invalid email"),

  password: body("password")
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

export const registerUserRules = [
  baseUserRules.name.notEmpty().withMessage("Your name is required"),
  baseUserRules.userName.notEmpty().withMessage("User name is required"),
  baseUserRules.email.notEmpty().withMessage("Email is required"),
  baseUserRules.password.notEmpty().withMessage("Password is required"),
  baseUserRules.firstName,
  baseUserRules.lastName,
  ...Object.values(baseUserRules.billingAddress),
];
