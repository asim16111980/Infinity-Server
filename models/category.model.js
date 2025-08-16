import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    uploadPath: { type: String, required: true },
    thumbnail: { type: String, required: true },
    visibility: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
