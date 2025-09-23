import { Strategy as FacebookStrategy } from "passport-facebook";
import facebookVerify from "../services/facebookVerify.js";

const facebookStrategy = () => {
    return new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/api/auth/facebook/callback`,
        profileFields: ["id", "displayName", "email", "gender", "picture"],
      },
      facebookVerify
    );
  };
  
  export default facebookStrategy;
  