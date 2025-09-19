import GoogleStrategy from "passport-google-oidc";
import googleVerify from "../services/googleVerify.js";

const googleStrategy = () => {
  return new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    googleVerify
  );
};

export default googleStrategy;
