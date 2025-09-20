import User from "../models/user.model.js";
import normalizeName from "../utils/normalizeName.js";

export default async function facebookVerify(
  accessToken,
  refreshToken,
  profile,
  done
) {
  try {
    const email = profile._json.email || null;
    const firstName = profile.name.givenName || null;
    const lastName = profile.name.familyName || null;
    const name = profile._json.name || null;
    const gender = profile._json.gender || "UNSPECIFIED";
    const avatar = profile._json.picture?.data?.url || null;

    let user = await User.findOne({ "providers.facebook.id": profile.id });

    if (!user) {
      user = await User.create({
        email,
        firstName: normalizeName(firstName, 2, 50),
        lastName: normalizeName(lastName, 2,5),
        oauthName: name,
        displayName: normalizeName(name),
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
