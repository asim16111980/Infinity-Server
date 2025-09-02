import mongoose from "mongoose";
import { validate } from "../utils/validator.js";
import _default from "validator";
import { USER_ROLES } from "../constants/userRoles.js";

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      validate: [validate.nameLength, "Full name must be 2-100 chars"],
    },
    country: { type: String },
    city: {
      type: String,
      validate: [validate.nameLength, "City must be 2-100 chars"],
    },
    street: {
      type: String,
      validate: [validate.nameLength, "Street must be 2-100 chars"],
    },
    zipCode: {
      type: String,
      validate: [validate.zipCode, "Invalid zip code"],
    },
    phoneNumber: {
      type: String,
      validate: [validate.phone, "Invalid phone number"],
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
     firstName: {
      type: String,
      validate: [validate.nameLength, "Invalid first name"],
      default: "",
    },
    lastName: {
      type: String,
      validate: [validate.nameLength, "Invalid last name"],
      default: "",
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
    uploadPath: { type: String, required: true },
    avatar: { type: String, default: "default_avatar.png" },
  
    token: { type: String },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.CUSTOMER,
    },
    billingAddress: { type: addressSchema, default: {} },
    shippingAddress: { type: addressSchema, default: {} },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
