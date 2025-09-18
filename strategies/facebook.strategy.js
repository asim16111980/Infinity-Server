import { Strategy as FacebookStrategy } from "passport-facebook";
import facebookVerify from "../services/facebookVerify.js";

const facebookStrategy = () => {
    return new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.SERVER_URL}/api/auth/facebook/callback`,
        profileFields: ["id", "displayName", "emails", "gender", "photos"],
      },
      facebookVerify
    );
  };
  
  export default facebookStrategy;
  