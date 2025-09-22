import User from "../models/user.model.js";
import normalizeName from "../utils/normalizeName.js";
import { OAuth2Client } from 'google-auth-library';
export default async function (issuer, sub, profile, jwtClaims, accessToken, refreshToken, params, done) {
    try {
      // هنا منطق تسجيل أو استرجاع المستخدم
      console.log(  params.id_token);
      // const user = { id: sub, name: profile.displayName };
      // return done(null, user);
   

   

    const client = new OAuth2Client(process.env.GOOGLE_APP_ID);
    
  
      const ticket = await client.verifyIdToken({
        idToken :params.id_token,
        audience: process.env.GOOGLE_APP_ID, // لازم يكون نفس الـ clientID بتاعك
      });
      console.log(ticket);
    
      const payload = ticket.getPayload();
      console.log(payload);
 
  try {
    const email = profile.emails[0].value || null;
    const firstName = profile.name.givenName || null;
    const lastName = profile.name.familyName || null;
    const name = profile.displayName || null;
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
//     console.log(profile);
//     // if (!user) {
//     //   user = await User.create({
//     //     googleId: profile.id,
//     //     name: profile.displayName,
//     //     email: profile.emails?.[0]?.value,
//     //   });  
//     // }

//     // return cb(null, user);
//   } catch (err) {
//     // return cb(err,null);
//   }
}
