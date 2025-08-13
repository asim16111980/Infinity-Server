import mongoose from "mongoose";
import { generateSKU, isUniqueSKU } from "../utils/generateSKU.js";

const productSchema = new mongoose.Schema(
  {
    SKU: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    categories: [{ type: String, required: true, trim: true }],
    images: [{ type: String, required: true }],
    rating: { type: Number, min: 0, max: 5 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String, required: true },
        rating: { type: Number, min: 0, max: 5 },
      },
    ],
    options: [[{ type: String, required: true }]],
    stock: { type: Number, required: true, min: 0 },
    discount: { type: Number, min: 0, max: 100 },
  },
  { timestamps: true }
);

productSchema.pre("validate", async function (next) {
  if (!this.SKU) {
    let newSKU;
    let unique = false;

    while (!unique) {
      newSKU = generateSKU(this.name);
      unique = await isUniqueSKU(newSKU);
    }

    this.SKU = newSKU;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
