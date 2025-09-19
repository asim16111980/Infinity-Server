import User from "../models/user.model.js";
import normalizeDisplayName from "../utils/normalizeDisplayName.js";

export default async function facebookVerify(
  accessToken,
  refreshToken,
  profile,
  done
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
        oauthName: name,
        displayName: normalizeDisplayName(name),
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

    return done(null,  user );
  } catch (err) {
    return done(err, null);
  }
}
