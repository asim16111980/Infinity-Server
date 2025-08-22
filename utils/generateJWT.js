import { Jwt } from "jsonwebtoken";

export const generateJWT = (payload, expired) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: expired,
  });
  return token;
};
