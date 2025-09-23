import User from "../models/user.model.js";
import normalizeName from "../utils/normalizeName.js";
import { OAuth2Client } from "google-auth-library";

export default async function (
  issuer,
  profile,
  sub,
  jwtClaims,
  accessToken,
  refreshToken,
  params,
  done
) {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: params.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email || null;
    const firstName = payload.given_name || null;
    const lastName = payload.family_name || null;
    const name = payload.name || null;
    const avatar = payload.picture || null;

    let user = await User.findOne({ "providers.google.id": profile.id });

    if (!user) {
      user = await User.create({
        email,
        firstName: normalizeName(firstName, 2, 50),
        lastName: normalizeName(lastName, 2, 5),
        oauthName: name,
        displayName: normalizeName(name),
        avatar,
        providers: {
          google: {
            id: profile.id,
            token: accessToken,
            name,
          },
        },
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  } 
}
