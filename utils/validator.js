import validator from "validator";

export const validate = {
  nameLength: (value) => validator.isLength(value, { min: 2, max: 100 }),
  userName: (value) => validator.isAlphanumeric(value, "en-US"),
  email: (value) => validator.isEmail(value),
  password: (value) =>
    validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  phone: (value) => validator.isMobilePhone(value, "any"),
  zipCode: (value) => validator.isPostalCode(value, "any"),
};
