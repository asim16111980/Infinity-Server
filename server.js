import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import productRouter from "./routes/product.route.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/products', productRouter);

const startServer = async () => {
  try {
    const uri = process.env.ATLAS_URI;
    await mongoose.connect(uri);
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log("Server is running on port:", port);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
