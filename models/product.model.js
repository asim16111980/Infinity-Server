import mongoose from "mongoose";
import { generateSKU, isUniqueSKU } from "../utils/generateSKU.js";

const productSchema = new mongoose.Schema(
  {
    SKU: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    categories: [{ type: String, required: true, trim: true }],
    imagesFolder: { type: String, required: true },
    images: [{ type: String, required: true }],
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: {
      type: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          comment: { type: String, required: true },
          rating: { type: Number, min: 0, max: 5 },
        },
      ],
      default: [],
    },
    options: {
      type: [{ optionName: { type: String }, values: { type: [String] } }],
      default: [],
    },
    stock: { type: Number, required: true, min: 0, default: 0 },
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
