import passport from "passport";
import facebookStrategy from "../strategies/facebook.strategy.js";
import User from "../models/user.model.js";

passport.use(facebookStrategy());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); 
  } catch (err) {
    done(err, null);
  }
});

export default passport;
