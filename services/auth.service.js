// services/auth.service.js
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/email/sendEmail.js";
import { generateJWT } from "../utils/generateJWT.js";

const registerUser = async (req) => {
  const { body, uploadPath, file } = req;
  const { email, password, role } = body;

  let oldUser = await User.findOne({ email });
  if (oldUser) {
    throw new AppError("User with this email already exists", 400);
  }

  const newData = { email, role };
  const hashedPassword = await bcrypt.hash(password, 10);
  newData.password = hashedPassword;
  newData.uploadPath = uploadPath;

  const avatar = file?.filename || "";
  if (avatar) {
    newData.avatar = avatar;
  }

  const newUser = new User(newData);

  return await newUser.save();
};

const loginUser = async (req) => {
  const { email, password } = req.body;

  let foundUser;
  if (email !== "") {
    foundUser = await User.findOne({ email });
  }

  if (!foundUser) {
    throw new AppError("Invalid credentials", 401);
  }

  const matchedPassword = await bcrypt.compare(password, foundUser.password);
  if (!matchedPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  return foundUser;
};

const requestPasswordReset = async (req) => {
  const clientURL = process.env.CLIENT_URL;

  const { email } = req.body;
  const foundUser = await User.findOne({ email });

  if (!foundUser) throw new AppError("User not found", 404);

  const payload = {
    id: foundUser._id,
    email: foundUser.email,
    role: foundUser.role,
  };

  const tokenExp = Date.now() + 3600000;
  const resetToken = generateJWT(payload, tokenExp);

  foundUser.token = resetToken;
  foundUser.save();

  const link = `${clientURL}/passwordReset?token=${resetToken}`;
  sendEmail(
    foundUser.email,
    "Password Reset Request",
    { name: foundUser.name, link },
    "./template/requestResetPassword.handlebars"
  );
  return link;
};

export { registerUser, loginUser, requestPasswordReset };
