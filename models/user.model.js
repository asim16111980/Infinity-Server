import mongoose from "mongoose";
import { validate } from "../utils/validator.js";
import _default from "validator";

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      validate: [validate.nameLength, "Full name must be 2-100 chars"],
      required: true,
    },
    country: { type: String, required: true },
    city: {
      type: String,
      validate: [validate.nameLength, "City must be 2-100 chars"],
      required: true,
    },
    street: {
      type: String,
      validate: [validate.nameLength, "Street must be 2-100 chars"],
      required: true,
    },
    zipCode: {
      type: String,
      validate: [validate.zipCode, "Invalid zip code"],
      required: true,
    },
    phoneNumber: {
      type: String,
      validate: [validate.phone, "Invalid phone number"],
      required: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      validate: [validate.nameLength, "Invalid first name"],
    },
    lastName: {
      type: String,
      validate: [validate.nameLength, "Invalid last name"],
    },
    displayName: {
      type: String,
      validate: [validate.nameLength, "Invalid display name"],
      required: true,
    },
    userName: {
      type: String,
      validate: [validate.userName, "Invalid username"],
      unique: true,
      required: true,
    },
    email: {
      type: String,
      validate: [validate.email, "Invalid email"],
      unique: true,
      required: true,
    },
    password: {
      type: String,
      validate: [validate.password, "Weak password"],
      required: true,
    },
    avatar: { type: String, _default: "default_avatar.png", required: true },
    billingAddress: addressSchema,
    shippingAddress: addressSchema,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
