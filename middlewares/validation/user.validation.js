import { body } from "express-validator";

const baseUserRules = {
  firstName: body("firstName")
    .isString()
    .withMessage("First name must be a string")
    .trim(),

  lastName: body("lastName")
    .isString()
    .withMessage("Last name must be a string")
    .trim(),

  displayName: body("displayName")
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

  billingAddress: {
    fullName: body("billingAddress.fullName")
      .isString()
      .withMessage("Full name must be a string")
      .trim(),

    country: body("billingAddress.country")
      .isString()
      .withMessage("Country must be a string")
      .trim(),

    city: body("billingAddress.city")
      .isString()
      .withMessage("City must be a string")
      .trim(),

    street: body("billingAddress.street")
      .isString()
      .withMessage("Street must be a string")
      .trim(),

    zipCode: body("billingAddress.zipCode")
      .isString()
      .withMessage("Zip code must be a string")
      .trim(),

    phoneNumber: body("billingAddress.phoneNumber")
      .isString()
      .withMessage("Phone number must be a string")
      .trim(),
  },
};

export const registerUserRules = [
  baseUserRules.userName.notEmpty().withMessage("User name is required"),
  baseUserRules.email.notEmpty().withMessage("Email is required"),
  baseUserRules.password.notEmpty().withMessage("Password is required"),
  baseUserRules.firstName,
  baseUserRules.lastName,
  baseUserRules.displayName,
  baseUserRules.billingAddress,
];
