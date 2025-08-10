import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get(
  "/",
  [
    body("name").isString().trim().notEmpty().withMessage("The name is required"),
    body("desc").isString().trim().notEmpty().withMessage("The description is required"),
    body("price").isNumeric().notEmpty().withMessage("The price is required"),
  ],
  (req, res, next) => {}
);
const starServer = async () => {
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

starServer();
