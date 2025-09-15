import User from "../models/user.model.js";

export default async function FacebookVerify(accessToken, refreshToken, profile, cb) {
  try {
    const email = profile._json.email || null;
    const name = profile._json.name || null;
    const gender = profile._json.gender || "UNSPECIFIED";
    const avatar = profile._json.picture?.data?.url || null;

    let user = await User.findOne({ "providers.facebook.id": profile.id });

    if (!user) {
      user = await User.create({
        email,
        oauthName: "facebook",
        displayName: normalizeDisplayName(profile.displayName),
        gender,
        avatar,
        providers: {
          facebook: {
            id: profile.id,
            token: accessToken,
            name
          },
        },
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = generateJWT(payload);
    
    user.token = token;
    
    const savedUser = await user.save();

    return cb(null, user);
  } catch (err) {
    return cb(err, null);
  }
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


