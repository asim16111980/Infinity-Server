import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    addressLine2: { type: String }, // optional
    zipCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    displayName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    displayName: { type: String, trim: true },
    billingAddress: addressSchema,
    shippingAddress: addressSchema,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
