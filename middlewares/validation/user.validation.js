import { body } from "express-validator";
import { USER_GENDER } from "../../constants/userGender";

const baseUserRules = {
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

  displayName: body("displayName")
    .optional()
    .isString()
    .withMessage("Display name must be a string")
    .trim(),

  gender: body("gender")
    .optional()
    .isIn(Object.values(USER_GENDER))
    .withMessage(
      `Gender must bo one of: ${Object.values(USER_GENDER).join(" , ")}`
    ),
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
export const registerUserRules = [baseUserRules.email, baseUserRules.password];

// Login rules
export const loginUserRules = [baseUserRules.email, baseUserRules.password];
