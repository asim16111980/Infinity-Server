import User from "../models/user.model.js";

export default async function FacebookVerify(
  accessToken,
  refreshToken,
  profile,
  cb
) {
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
            name,
          },
        },
      });
    }

    return cb(null, { user });
  } catch (err) {
    return cb(err, null);
  }
}
