import bcrypt from "bcrypt";
import path from "path";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import User from "../models/user.model.js";
import { jsendSuccess } from "../utils/jsend.js";
import { USER_ROLES } from "../constants/userRoles.js";
import { generateJWT } from "../utils/generateJWT.js";

const seedAdminOnStartup = async () => {
  try {
    const existingAdmin = await User.findOne({ role: USER_ROLES.ADMIN });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists. Skipping seeding...");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminData = {
      name: "Super Admin",
      username: "SuperAdmin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      uploadPath: path.join("uploads", "users"),
      role: USER_ROLES.ADMIN,
    };

    const newUser = new User(adminData);

    const payload = {
      id: newUser._id,
      username: newUser.username,
      role: newUser.role,
    };

    const token = generateJWT(payload);
    newUser.token = token;

    const savedAdmin = await newUser.save();

    console.log("🎉 Admin created successfully:", {
      id: savedAdmin._id,
      email: savedAdmin.email,
      role: savedAdmin.role,
    });

    return savedAdmin;
  } catch (err) {
    console.error("❌ Error seeding admin:", err.message);
  }
};

const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find(
    {},
    { __v: 0, password: 0, createdAt: 0, updatedAt: 0 }
  );
  return jsendSuccess(res, { users });
});

export { getUsers, seedAdminOnStartup };
