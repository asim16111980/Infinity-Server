import validator from "validator";

export const validator = {
  validateNameLength: (value) =>
    validator.isLength(value, { min: 2, max: 100 }),
  validateUserName: (value) => validator.isAlphanumeric(value, "en-US"),
  validateEmail: (value) => validator.isEmail(value),
  validatePassword: (value) =>
    validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  validatePhone: (value) => validator.isMobilePhone(value, "any"),
  validateZipCode: (value) => validator.isPostalCode(value, "any"),
};
