import mongoose from "mongoose";
import {
  validateNameLength,
  validateUserName,
  validateEmail,
  validatePassword,
  validatePhone,
  validateZipCode,
} from "../utils/validator.js";

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      validate: [validateNameLength, "Full name must be 2-100 chars"],
      required: true,
    },
    country: { type: String, required: true },
    city: {
      type: String,
      validate: [validateNameLength, "City must be 2-100 chars"],
      required: true,
    },
    street: {
      type: String,
      validate: [validateNameLength, "Street must be 2-100 chars"],
      required: true,
    },
    zipCode: {
      type: String,
      validate: [validateZipCode, "Invalid zip code"],
      required: true,
    },
    phoneNumber: {
      type: String,
      validate: [validatePhone, "Invalid phone number"],
      required: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, validate: [validateNameLength, "Invalid first name"] },
    lastName: { type: String, validate: [validateNameLength, "Invalid last name"] },
    displayName: { type: String, validate: [validateNameLength, "Invalid display name"], required: true },
    userName: { type: String, validate: [validateUserName, "Invalid username"], unique: true, required: true },
    email: { type: String, validate: [validateEmail, "Invalid email"], unique: true, required: true },
    password: { type: String, validate: [validatePassword, "Weak password"], required: true },
    avatar: { type: String, required: true },
    billingAddress: addressSchema,
    shippingAddress: addressSchema,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
