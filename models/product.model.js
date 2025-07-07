import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    images: [{ type: String, required: true }],
    rating: { type: Number, min: 0, max: 5 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String, required: true },
        rating: { type: Number, min: 0, max: 5 },
      },
    ],
    colors: [{ type: String, required: true }],
    stock: { type: Number, required: true, min: 0 },
    measurements: {
      weight: { type: Number, required: true, min: 0 },
      dimensions: {
        length: { type: Number, required: true, min: 0 },
        width: { type: Number, required: true, min: 0 },
        height: { type: Number, required: true, min: 0 },
      },
    },
    discount: { type: Number, min: 0, max: 100 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
