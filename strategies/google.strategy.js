import GoogleStrategy from "passport-google-oidc";
import googleVerify from "../services/googleVerify.js";

const googleStrategy = () => {
  return new GoogleStrategy(
    {
      // clientID: process.env.GOOGLE_APP_ID,
      // clientSecret: process.env.GOOGLE_APP_SECRET,
      // callbackURL: "http://localhost:5000/api/auth/google/callback",
      // passReqToCallback: true,
      // scope: ["openid","profile"]
      // issuer: "https://accounts.google.com",
      // authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
      // tokenURL: "https://www.googleapis.com/oauth2/v4/token",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
      scope: [
        "openid",
        "profile",
        "email",
      ],
    },
    googleVerify
  );
};

export default googleStrategy;

// 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
