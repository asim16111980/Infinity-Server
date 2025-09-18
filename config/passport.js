import passport from "passport";
import facebookStrategy from "../strategies/facebook.strategy.js";

passport.use(facebookStrategy());

export default passport;
