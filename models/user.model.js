import mongoose from "mongoose";
import { validate } from "../utils/validator.js";
import { USER_ROLES } from "../constants/userRoles.js";
import { USER_GENDER } from "../constants/userGender.js";

// 🟢 Address Sub-Schema
const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      validate: [validate.nameLength(2, 100), "Full name must be 2-100 chars"],
    },
    country: { type: String },
    city: {
      type: String,
      validate: [validate.nameLength(2, 100), "City must be 2-100 chars"],
    },
    street: {
      type: String,
      validate: [validate.nameLength(2, 100), "Street must be 2-100 chars"],
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

// 🟢 Main User Schema
const userSchema = new mongoose.Schema(
  {
    // 🔹 Group 1: Basic Info
    firstName: {
      type: String,
      validate: [validate.nameLength(2, 50), "Invalid first name"],
      default: "",
    },
    lastName: {
      type: String,
      validate: [validate.nameLength(2, 50), "Invalid last name"],
      default: "",
    },
    displayName: {
      type: String,
      validate: [validate.nameLength(), "Invalid display name"],
      default: "",
    },

    gender: {
      type: String,
      enum: [USER_GENDER.male, USER_GENDER.female, USER_GENDER.unspecified],
      default: USER_GENDER.unspecified,
    },

    // 🔹 Group 2: Local Auth (Normal signup)
    email: {
      type: String,
      validate: [validate.email, "Invalid email"],
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      validate: [validate.password, "Weak password"],
      select: false,
    },

    // 🔹 Group 3: OAuth Providers
    providers: {
      oauthName: { type: String },
      facebook: {
        id: { type: String, unique: true, sparse: true },
        name: { type: String },
        token: { type: String },
      },
      google: {
        id: { type: String, unique: true, sparse: true },
        name: { type: String },
        token: { type: String },
      },
    },

    // 🔹 Group 4: Profile & Media
    avatar: { type: String, default: "default_avatar.png" },
    uploadPath: { type: String },

    // 🔹 Group 5: Tokens & Auth
    token: { type: String },

    // 🔹 Group 6: Roles & Permissions
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.CUSTOMER,
    },

    // 🔹 Group 7: Addresses
    billingAddress: { type: addressSchema, default: {} },
    shippingAddress: { type: addressSchema, default: {} },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
