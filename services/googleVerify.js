import User from "../models/user.model.js";

export default async function (issuer, profile, cb) {
  try {
    // const email = profile._json.email || null;
    // const name = profile._json.name || null;
    // const gender = profile._json.gender || "UNSPECIFIED";
    // const avatar = profile._json.picture?.data?.url || null;

    // let user = await User.findOne({ "providers.google.id": profile.id });

    // if (!user) {
    //   user = await User.create({
    //     email,
    //     oauthName: name,
    //     displayName: normalizeDisplayName(name),
    //     gender,
    //     avatar,
    //     providers: {
    //       google: {
    //         id: profile.id,
    //         token: accessToken,
    //         name,
    //       },
    //     },
    //   });
    // }
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
