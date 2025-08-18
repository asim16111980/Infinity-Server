import asyncWrapper from "../middlewares/asyncWrapper.js";
import User from "../models/user.model.js";
import { jsendSuccess } from "../utils/jsend.js";

const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
  return jsendSuccess(res, { users });
});

export  { getUsers };
