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


router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false, failureRedirect: "/login" }),
  async (req, res, next) => {
    try {
      // هنا الـ user جاي من FacebookStrategy (اللي انت مولد له token)
      const { user } = req.user; 
      const token = req.user.token;

      // نفس فكرة السيشن زي اللوجن العادي
      const day = 1000 * 60 * 60 * 24;
      const sessionMaxAge = { short: day, long: day * 7 };
      req.session.cookie.maxAge = sessionMaxAge.short; // أو استخدم remember لو عندك
      req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role,
      };

      req.session.save((err) => {
        if (err) return next(err);

        return res.json({
          status: "success",
          data: {
            authToken: token,
            expiresIn: process.env.JWT_EXPIRES_IN,
          },
        });
      });
    } catch (err) {
      next(err);
    }
  }
);
