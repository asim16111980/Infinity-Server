import { Strategy as FacebookStrategy } from "passport-facebook";
import FacebookVerify from "../services/facebookVerify.js";

export default FacebookStrategy = () => {
  return new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/facebook/callback`,
      profileFields: ["name", "gender", "email", "picture"],
    },
    FacebookVerify()
  );
};
