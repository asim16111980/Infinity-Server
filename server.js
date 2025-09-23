import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import productsRouter from "./routes/products.route.js";
import categoriesRouter from "./routes/categories.route.js";
import usersRouter from "./routes/users.route.js";
import authRouter from "./routes/auth.route.js";
import { jsendFail, jsendError } from "./utils/jsend.js";
import path from "path";
import { fileURLToPath } from "url";
import AppError from "./utils/appError.js";
import { seedAdminOnStartup } from "./controllers/user.controller.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import MongoStore from "connect-mongo";
import { configureSession } from "./middlewares/configureSession.js";
import passport from "passport";

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongoStore = MongoStore.create({
  mongoUrl: process.env.ATLAS_URI,
  collectionName: "sessions",
  ttl: 60 * 60 * 24,
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use("/api/auth", configureSession(mongoStore));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

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

    await seedAdminOnStartup();

    app.listen(port, () => {
      console.log("Server is running on port:", port);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
