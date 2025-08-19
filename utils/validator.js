import validator from "validator";

export const validate = {
  nameLength: (value) => {
    if (!value) return true;
    return validator.isLength(value, { min: 2, max: 100 });
  },
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
  phone: (value) => {
    if (!value) return true;
    return validator.isMobilePhone(value, "any");
  },
  zipCode: (value) => {
    if (!value) return true;
    return validator.isPostalCode(value, "any");
  },
};
