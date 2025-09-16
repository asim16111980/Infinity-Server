import passport from "passport";
import { facebookStrategy } from "./strategy/facebookStrategy.js";

passport.use(facebookStrategy());

export default passport;
