import asyncWrapper from "../middlewares/asyncWrapper.js";
import User from "../models/user.model.js";

export default FacebookVerify = asyncWrapper(
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.email });

      if (!user) {
        user = await User.create({
          email: profile.email,
          displayName: profile.name,
          gender: profile.gender,
          avatar: profile.picture || null,
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
);

const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation failed", 400);
  }

  const { email, password, role } = req.body;

  let oldUser = await User.findOne({ email });
  if (oldUser) {
    throw new AppError("User with this email already exists", 400);
  }

  const newData = { email, role };
  const hashedPassword = await bcrypt.hash(password, 10);
  newData.password = hashedPassword;
  newData.uploadPath = req.uploadPath;

  const avatar = req.file?.filename || "";
  if (avatar) {
    newData.avatar = avatar;
  }

  const newUser = new User(newData);

  const payload = {
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
  };
  const token = generateJWT(payload);

  newUser.token = token;

  const savedUser = await newUser.save();
  return jsendSuccess(res, { user: savedUser }, 201);