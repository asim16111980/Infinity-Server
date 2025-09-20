import User from "../models/user.model.js";
import normalizeName from "../utils/normalizeName.js";

export default async function (issuer, profile, cb) {
  try {
    const email = profile.emails[0].value || null;
    const firstName = profile.name.givenName || null;
    const lastName = profile.name.familyName || null;
    const name = profile.displayName || null;

    let user = await User.findOne({ "providers.google.id": profile.id });

    if (!user) {
      user = await User.create({
        email,
        firstName: normalizeName(firstName, 2, 50),
        lastName: normalizeName(lastName, 2, 5),
        oauthName: name,
        displayName: normalizeName(name),
        providers: {
          google: {
            id: profile.id,
            token: accessToken,
            name,
          },
        },
      });
    }
    console.log(profile);
    // if (!user) {
    //   user = await User.create({
    //     googleId: profile.id,
    //     name: profile.displayName,
    //     email: profile.emails?.[0]?.value,
    //   });
    // }

    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
}
