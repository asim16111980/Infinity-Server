import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import productRouter from "./routes/product.route.js";
import { jsendFail } from "../utils/jsend.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/products", productRouter);

app.all("*", (req, res) => {
  return jsendFail(res, { message: "Not Found" }, 404);
});

app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return jsendFail(res, { message: err.message }, 400);
  }
  if (err instanceof AppError) {
    return jsendFail(res, { message: err.message }, err.statusCode);
  } 
  return jsendError(res, err.message);
});

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
